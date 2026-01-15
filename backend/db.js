const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }

  console.log("MySQL Connected");

  // ✅ AUTO-CREATE TABLES IF THEY DON'T EXIST

  db.query(`
    CREATE TABLE IF NOT EXISTS profile (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100),
      email VARCHAR(100),
      education VARCHAR(255),
      work VARCHAR(255)
    )
  `, err => {
    if (err) console.error("Profile table error:", err);
  });

  db.query(`
    CREATE TABLE IF NOT EXISTS skills (
      id INT PRIMARY KEY AUTO_INCREMENT,
      profile_id INT,
      skill VARCHAR(50),
      FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
    )
  `, err => {
    if (err) console.error("Skills table error:", err);
  });

  db.query(`
    CREATE TABLE IF NOT EXISTS links (
      id INT PRIMARY KEY AUTO_INCREMENT,
      profile_id INT,
      github VARCHAR(255),
      linkedin VARCHAR(255),
      FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
    )
  `, err => {
    if (err) console.error("Links table error:", err);
  });
});

module.exports = db;
