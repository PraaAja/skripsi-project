const db = require("./config/db");
const { classifyStudent } = require("./utils/c45");

async function processAllPending() {
  console.log("Starting process of all pending students...");

  // 1. Ambil data training
  const trainingQuery = "SELECT * FROM training_data WHERE jurusan IS NOT NULL";
  db.query(trainingQuery, async (err2, trainingData) => {
    if (err2) {
      console.error("DB ERROR SELECT TRAINING:", err2);
      process.exit(1);
    }
    console.log(`Successfully loaded ${trainingData.length} training data records.`);

    // 2. Ambil student_scores yang belum diproses
    const pendingQuery = `
      SELECT ss.* 
      FROM student_scores ss
      LEFT JOIN siswa s ON s.user_id = ss.user_id
      WHERE s.status IS NULL OR s.status != 'Sudah Diproses' OR s.user_id IS NULL
    `;

    db.query(pendingQuery, async (err, students) => {
      if (err) {
        console.error("DB ERROR SELECT PENDING:", err);
        process.exit(1);
      }

      console.log(`Found ${students.length} potential student records to process.`);

      let processedCount = 0;
      let skippedCount = 0;

      for (const student of students) {
        const studentScores = {
          pai: Number(student.pai) || 0,
          ppkn: Number(student.ppkn) || 0,
          bahasa_indonesia: Number(student.bahasa_indonesia) || 0,
          bahasa_inggris: Number(student.bahasa_inggris) || 0,
          matematika_umum: Number(student.matematika_umum) || 0,
          ipa: Number(student.ipa) || 0,
          ips: Number(student.ips) || 0,
          bahasa_daerah: Number(student.bahasa_daerah) || 0,
          pjok: Number(student.pjok) || 0,
          seni: Number(student.seni) || 0,
          informatika: Number(student.informatika) || 0,
        };

        const runClassificationAndSave = (userId) => {
          return new Promise((resolve) => {
            const hasil = classifyStudent(studentScores, trainingData);

            const saveQuery = `
              INSERT INTO siswa 
                (user_id, nama, kelas, jurusan, confidence, status, alasan, entropy, information_gain) 
              VALUES 
                (?, ?, ?, ?, ?, 'Sudah Diproses', ?, ?, ?)
              ON DUPLICATE KEY UPDATE 
                nama = VALUES(nama),
                kelas = VALUES(kelas),
                jurusan = VALUES(jurusan),
                confidence = VALUES(confidence),
                status = VALUES(status),
                alasan = VALUES(alasan),
                entropy = VALUES(entropy),
                information_gain = VALUES(information_gain)
            `;

            db.query(
              saveQuery,
              [
                userId,
                student.nama,
                student.kelas,
                hasil.jurusan,
                hasil.confidence,
                JSON.stringify(hasil.alasan),
                hasil.entropy,
                hasil.information_gain
              ],
              (err3) => {
                if (err3) {
                  console.error(`Failed to save for student ${student.nama}:`, err3);
                  skippedCount++;
                } else {
                  processedCount++;
                }
                resolve();
              }
            );
          });
        };

        let userId = student.user_id;
        if (!userId) {
          // Look up userId by name
          const getUserQuery = "SELECT id FROM users WHERE LOWER(TRIM(nama)) = LOWER(TRIM(?)) LIMIT 1";
          await new Promise((resolve) => {
            db.query(getUserQuery, [student.nama], async (errUser, userResult) => {
              if (errUser) {
                console.error(`DB error looking up user for ${student.nama}:`, errUser);
                skippedCount++;
                resolve();
                return;
              }

              if (userResult.length > 0) {
                userId = userResult[0].id;
                // Update student_scores user_id for consistency
                db.query("UPDATE student_scores SET user_id = ? WHERE id = ?", [userId, student.id]);
                await runClassificationAndSave(userId);
              } else {
                console.log(`Skipped: Student "${student.nama}" has no user account in users table.`);
                skippedCount++;
              }
              resolve();
            });
          });
        } else {
          await runClassificationAndSave(userId);
        }
      }

      console.log("-----------------------------------------");
      console.log(`Batch processing finished.`);
      console.log(`Successfully processed: ${processedCount} students.`);
      console.log(`Skipped/Failed: ${skippedCount} students.`);
      console.log("-----------------------------------------");
      db.end();
    });
  });
}

processAllPending();