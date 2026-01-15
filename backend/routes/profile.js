const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE / UPDATE PROFILE
router.post("/", (req, res) => {
  const {
    name,
    email,
    education,
    work,
    skills,
    github,
    linkedin
  } = req.body;

  // Insert profile
  const profileQuery = `
    INSERT INTO profile (name, email, education, work)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    profileQuery,
    [name, email, education, work],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const profileId = result.insertId;

      // Insert skills (comma-separated)
      if (skills) {
        const skillList = skills.split(",");
        skillList.forEach(skill => {
          db.query(
            "INSERT INTO skills (profile_id, skill) VALUES (?, ?)",
            [profileId, skill.trim()]
          );
        });
      }

      // Insert links
      db.query(
        "INSERT INTO links (profile_id, github, linkedin) VALUES (?, ?, ?)",
        [profileId, github, linkedin]
      );

      res.json({ message: "Profile created successfully" });
    }
  );
});

module.exports = router;
