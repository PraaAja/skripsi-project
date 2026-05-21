const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jurusan_db"
});

db.connect((err) => {
  if (err) {
    console.error("DB Error:", err);
    process.exit(1);
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;