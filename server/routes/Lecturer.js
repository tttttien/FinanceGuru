const express = require("express");
const router = express.Router();
const { Lecturer } = require("../models");

// Request to create a new lecturer
router.post("/", async (req, res) => {
    try {
        const lecturer = req.body;
        await Lecturer.create(lecturer);
        res.json(lecturer);
    } catch (error) {
        console.error("Error creating lecturer:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
