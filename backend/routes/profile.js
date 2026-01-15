const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/", (req, res) => {
  const query = `
    SELECT 
      p.id,
      p.name,
      p.email,
      p.education,
      p.work,
      GROUP_CONCAT(DISTINCT s.skill) AS skills,
      MAX(l.github) AS github,
      MAX(l.linkedin) AS linkedin
    FROM profile p
    LEFT JOIN skills s ON p.id = s.profile_id
    LEFT JOIN links l ON p.id = l.profile_id
    GROUP BY p.id
    ORDER BY p.id DESC
    LIMIT 1
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.json({});
    }

    res.json(results[0]);
  });
});


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

    
      if (skills) {
        const skillList = skills.split(",");
        skillList.forEach(skill => {
          db.query(
            "INSERT INTO skills (profile_id, skill) VALUES (?, ?)",
            [profileId, skill.trim()]
          );
        });
      }
 
      db.query(
        "INSERT INTO links (profile_id, github, linkedin) VALUES (?, ?, ?)",
        [profileId, github, linkedin]
      );

      res.json({ message: "Profile created successfully" });
    }
  );
});

module.exports = router;
