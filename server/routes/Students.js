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

router.delete('/pending/delete/:Num', async (req, res) => {
  try {
    const deletedCount = await Students.destroy({
      where: { Num: req.params.Num },
    });
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Request to create a new student
router.post("/", async (req, res) => {
  const student = req.body;
  await Students.create(student);
  res.json(student);
});

router.get("/accepted", async (req, res) => {
  try {
    const acceptedStudents = await Students.findAll({
      where: { Status: "Accepted" }, // Filter by status
      order: [["Num", "ASC"]], // Sort by Num column in ascending order
    });
    res.json(acceptedStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/accepted/count", async (req, res) => {
  try {
    const acceptedStudentsCount = await Students.count({
      where: { Status: "Accepted" }, // Lọc theo trạng thái
    });
    res.json({ count: acceptedStudentsCount });
  } catch (error) {
    console.error("Lỗi khi truy xuất thông tin học sinh:", error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
});

router.get("/pending", async (req, res) => {
  try {
    const pendingStudents = await Students.findAll({
      where: { Status: "Pending" }, // Filter by status
      order: [["Num", "ASC"]], // Sort by Num column in ascending order
    });
    res.json(pendingStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put('/pending/:Num', async (req, res) => {
  try {
    // Get student ID (Num) from the route parameter
    const studentNum = req.params.Num;

    // Find the student by Num
    const student = await Students.findOne({ where: { Num: studentNum } });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if status is "null" (assuming this is the pending state)
    if (student.Status === "Pending") {
      student.Status = "Accepted"; // Update status to "Accepted"
    } else {
      // Handle cases where the status is already not "null" (optional)
      console.warn(`Student ${studentNum} already has status "${student.Status}"`);
      // You can return a specific error message or continue as needed
    }

    // Save the updated student
    await student.save();

    // Return the updated student information
    res.json(student);
  } catch (error) {
    console.error("Error updating student status:", error);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/pending/:Num", async (req, res) => {
  try {
    const studentNum = req.params.Num;
    const listOfStudents = await Students.findOne({ where: { Num: studentNum } });
    res.json(listOfStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
