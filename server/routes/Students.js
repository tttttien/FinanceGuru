const express = require("express");
const router = express.Router();
const { Students } = require("../models");

// Request to get all student
router.get("/", async (req, res) => {
  try {
    const listOfStudents = await Students.findAll({
      order: [["Num", "ASC"]], // Sort by Num column in descending order
    });
    res.json(listOfStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/:name", async (req, res) => {
  try {
    const students = await Students.findOne({
      where: { Name: req.params.name },
    });
    if (!students) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(students);
  } catch (error) {
    console.error("Error fetching Student by Name:", error);
    console.log("500");
    res.status(500).json({ error: "Server error" });
  }
});

// Request to create a new student
router.post("/", async (req, res) => {
  const student = req.body;
  await Students.create(student);
  res.json(student);
});

module.exports = router;
