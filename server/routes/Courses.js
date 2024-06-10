const express = require("express");
const router = express.Router();
const Sequelize = require('sequelize');
const { Courses } = require("../models");

// Request to get all incomes
router.get("/", async (req, res) => {
    try {
        const listOfCourses = await Courses.findAll({
            order: [["ID", "ASC"]], // Sort by Num column in descending order
        });
        res.json(listOfCourses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Server error" });
    }
});


router.post("/", async (req, res) => {
    try {
        const course = req.body;
        await Courses.create(course);
        res.json(course);
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;