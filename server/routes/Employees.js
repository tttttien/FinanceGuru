const express = require("express");
const router = express.Router();
const { Employees } = require("../models");

// Request to get all employee
router.get("/", async (req, res) => {
    try {
        const listOfEmployees = await Employees.findAll({
            order: [["ID", "ASC"]], // Sort by Num column in descending order
        });
        res.json(listOfEmployees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Server error" });
    }
});


router.get("/:name", async (req, res) => {
    try {
        const employees = await Employees.findOne({
            where: { Name: req.params.name },
        });
        if (!employees) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.json(employees);
    } catch (error) {
        console.error("Error fetching Employee by Name:", error);
        console.log("500");
        res.status(500).json({ error: "Server error" });
    }
});

// Request to create a new employee
router.post("/", async (req, res) => {
    try {
        const employee = req.body;
        await Employees.create(employee);
        res.json(employee);
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
