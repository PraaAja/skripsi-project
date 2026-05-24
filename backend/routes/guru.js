const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { classifyStudent } = require("../utils/c45");





// GET /api/guru/dashboard
// GET /api/guru/dashboard
router.get("/dashboard", (req, res) => {

  const query = `
    SELECT

      (SELECT COUNT(*) FROM student_scores) AS totalSiswa,

      (
        SELECT COUNT(*)
        FROM siswa
        WHERE status = 'Sudah Diproses'
      ) AS totalRekomendasi,

      (
        (SELECT COUNT(*) FROM student_scores)
        -
        (
          SELECT COUNT(*)
          FROM siswa
          WHERE status = 'Sudah Diproses'
        )
      ) AS pending
  `;

  db.query(query, (err, rows) => {

    if (err) {
      console.error("ERROR DASHBOARD:", err);
      return res.status(500).json(err);
    }

    res.json(rows[0]);

  });

});

router.get("/siswa", (req, res) => {

  const {
    search = "",
    paket = "",
    kelas = ""
  } = req.query;

  let query = `
    SELECT
      ss.id,

      ss.nama,
      ss.kelas,

      ss.pai,
      ss.ppkn,
      ss.bahasa_indonesia,
      ss.bahasa_inggris,
      ss.matematika_umum,
      ss.ipa,
      ss.ips,
      ss.bahasa_daerah,
      ss.pjok,
      ss.seni,
      ss.informatika,

      COALESCE(s.status, 'Belum Diproses') AS status,
      s.jurusan,
      s.confidence,

      (
        (
          COALESCE(ss.pai,0) +
          COALESCE(ss.ppkn,0) +
          COALESCE(ss.bahasa_indonesia,0) +
          COALESCE(ss.bahasa_inggris,0) +
          COALESCE(ss.matematika_umum,0) +
          COALESCE(ss.ipa,0) +
          COALESCE(ss.ips,0) +
          COALESCE(ss.bahasa_daerah,0) +
          COALESCE(ss.pjok,0) +
          COALESCE(ss.seni,0) +
          COALESCE(ss.informatika,0)
        ) / 11
      ) AS rata

    FROM student_scores ss

    LEFT JOIN siswa s
    ON s.user_id = ss.user_id

    WHERE 1=1
  `;

  const params = [];

  // SEARCH
  if (search) {
    query += ` AND LOWER(ss.nama) LIKE ?`;
    params.push(`%${search.toLowerCase()}%`);
  }

  // FILTER PAKET
  if (paket) {
    query += ` AND s.jurusan = ?`;
    params.push(paket);
  }

// GANTI BAGIAN FILTER KELAS DI guru.js JADI INI:
if (kelas) {
  query += ` AND LOWER(TRIM(ss.kelas)) = LOWER(TRIM(?)) `;
  params.push(kelas);
}
  query += ` ORDER BY ss.nama ASC`;

  db.query(query, params, (err, result) => {

    if (err) {
      console.error("ERROR SISWA GURU:", err);
      return res.status(500).json(err);
    }

    res.json(result);

  });

});
 router.put("/siswa/:id/proses", (req, res) => {
  const { id } = req.params;

  const query = `
    UPDATE siswa 
    SET status = 'Sudah Diproses'
    WHERE id = ?
  `;

  db.query(query, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update status" });
    }

    res.json({ message: "Status berhasil diupdate" });
  });
});

router.get("/rekomendasi", (req, res) => {
  db.query(
    "SELECT id, nama FROM users WHERE TRIM(LOWER(role)) = 'siswa'",
    (err, results) => {
      if (err) {
        console.error("ERROR:", err);
        return res.status(500).json({ message: err.message });
      }

      // 🔥 dummy rekomendasi
      const data = results.map((siswa) => ({
        id: siswa.id,
        nama: siswa.nama,
        jurusan: "IPA",
        confidence: 85,
        alasan: "Nilai IPA lebih tinggi dari IPS",
      }));

      res.json(data);
    }
  );
});

// 🔥 PROSES OTOMATIS REKOMENDASI DENGAN ALGORITMA C4.5
router.post("/proses/:id", (req, res) => {
  const { id } = req.params;

  // 1. Ambil data nilai siswa dari student_scores
  const getSiswaScore = "SELECT * FROM student_scores WHERE id = ? LIMIT 1";

  db.query(getSiswaScore, [id], (err, rows) => {
    if (err) {
      console.error("DB ERROR SELECT SCORE:", err);
      return res.status(500).json({ message: "Gagal memproses rekomendasi" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: "Siswa tidak ditemukan di data nilai" });
    }

    const student = rows[0];

    // Persiapkan 11 nilai mata pelajaran untuk diinput ke model C4.5
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

    // Fungsi pembantu untuk menyimpan klasifikasi
    const runClassificationAndSave = (userId) => {
      // 2. Ambil data training
      const trainingQuery = "SELECT * FROM training_data WHERE jurusan IS NOT NULL";

      db.query(trainingQuery, (err2, trainingData) => {
        if (err2) {
          console.error("DB ERROR SELECT TRAINING:", err2);
          return res.status(500).json({ message: "Gagal mengambil data training" });
        }

        // 3. Masuk ke algoritma C4.5
        const hasil = classifyStudent(studentScores, trainingData);

        // 4. Simpan ke database siswa menggunakan INSERT ... ON DUPLICATE KEY UPDATE
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
              console.error("DB ERROR SAVE SISWA:", err3);
              return res.status(500).json({ message: "Gagal menyimpan hasil klasifikasi" });
            }

            res.json({
              message: "Siswa berhasil diproses rekomendasi secara otomatis",
              hasil,
            });
          }
        );
      });
    };

    // 5. Cek/Verifikasi user_id siswa
    if (student.user_id) {
      runClassificationAndSave(student.user_id);
    } else {
      // Jika user_id kosong, coba cari berdasarkan nama
      const getUserQuery = "SELECT id FROM users WHERE LOWER(TRIM(nama)) = LOWER(TRIM(?)) LIMIT 1";
      db.query(getUserQuery, [student.nama], (errUser, userResult) => {
        if (errUser) {
          console.error("DB ERROR SELECT USER:", errUser);
          return res.status(500).json({ message: "Gagal memverifikasi akun siswa" });
        }

        const userId = userResult.length > 0 ? userResult[0].id : null;
        if (!userId) {
          return res.status(404).json({ message: "Siswa belum memiliki akun pengguna di sistem" });
        }

        runClassificationAndSave(userId);
      });
    }
  });
});

module.exports = router;