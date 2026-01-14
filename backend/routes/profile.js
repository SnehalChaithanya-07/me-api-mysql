const express = require("express");
const router = express.Router();
const Database = require("../db");


router.post("/", (req, res) => {
  const { name, email, education, work, skills, github, linkedin } = req.body;

  Database.query(
    "INSERT INTO profile (name, email, education, work) VALUES (?, ?, ?, ?)",
    [name, email, education, work],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const profileId = result.insertId;

      const skillValues = skills.map(skill => [profileId, skill]);
      Database.query(
        "INSERT INTO skills (profile_id, skill) VALUES ?",
        [skillValues]
      );

      Database.query(
        "INSERT INTO links (profile_id, github, linkedin) VALUES (?, ?, ?)",
        [profileId, github, linkedin],
        () => res.json({ message: "Profile created with links" })
      );
    }
  );
});
 

router.get("/", (req, res) => {
  Database.query(
    `SELECT 
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
     LIMIT 1`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});





router.put("/", (req, res) => {
  const { work } = req.body;
  Database.query(
    "UPDATE profile SET work=? ORDER BY id DESC LIMIT 1",
    [work],
    () => res.json({ message: "Profile updated" })
  );
});



router.get("/search", (req, res) => {
  const skill = req.query.skill;

  Database.query(
    `SELECT DISTINCT p.name, s.skill
     FROM profile p
     JOIN skills s ON p.id = s.profile_id
     WHERE s.skill = ?`,
    [skill],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});


module.exports = router;
