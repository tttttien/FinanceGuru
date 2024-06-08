const express = require("express");
const Sequelize = require('sequelize');
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

router.get("/lecturer", async (req, res) => {
    try {
        // Define the positions to filter by
        const positions = ["Mathematic Lecturer", "Literature Lecturer", "English Lecturer"];

        // Filter employees based on specific positions and select FullName
        const lecturerFullNames = await Employees.findAll({
            attributes: ['FullName'], // Specify attributes to retrieve (only FullName)
            where: {
                position: {
                    [Sequelize.Op.in]: positions, // Use Sequelize Op.in for exact matching
                },
            },
            order: [["ID", "ASC"]], // Sort by ID in ascending order
        });

        // Return the list of lecturer FullNames
        res.json(lecturerFullNames);
    } catch (error) {
        console.error("Error fetching lecturer names:", error);
        res.status(500).json({ error: "Server error" });
    }
});



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




router.delete('/delete/:employeeId', async (req, res) => {
    try {
        const deletedCount = await Employees.destroy({
            where: { id: req.params.employeeId },
        });
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post("/Login", async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await Employees.findOne({ where: { EmployeeEmail: email } });
    if (!user) {
        return res.status(401).json({ error: "User doesn't exist" });
    }

    // Compare password (replace with secure hashing!)
    if (password === user.Password) {
        // Prepare response data
        if (password === user.Password) {
            // Prepare response data
            const userData = { message: "LOGGED IN!!!", userId: user.id, fullName: user.FullName };
            res.json(userData); // Send response data back to client
        }
    } else {
        return res.status(401).json({ error: "Wrong username and password combination" });
    }
});

module.exports = router;
