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

// router.post("/", async (req, res) => {
//     try {
//         const {FullName, EmployeeEmail, EmployeeDOB, Password, Gender, Position, EmployeePhone, EmployeeAddress } = req.body;

//         if (!Password || Password.trim() === "") {
//             return res.status(400).json({ message: "Password cannot be empty" });
//         }

//         const hashedPassword = await bcrypt.hash(Password, 10);

//         const user = {
//             FullName,
//             Gender,
//             EmployeeDOB,
//             EmployeeAddress,
//             EmployeePhone,
//             Position,
//             EmployeeEmail,
//             Password: hashedPassword,
//         };

//         userStore.set(EmployeeEmail, user);

//         res.status(200).json({ message: "Employee created successfully" });
//     } catch (error) {
//         console.error("Error creating employee:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// });


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
    const user = await Employees.findOne({ where: { EmployeeEmail: email } });

    if (!user) {
        res.json({ error: "User Doesn't Exist" });
    } else {
        // **WARNING: This approach is not secure!**
        if (password === user.Password) {
            res.json({ message: "LOGGED IN!!!", user: user });
        } else {
            res.status(400).json({ error: "Wrong Username And Password Combination" });
        }
    }
});
module.exports = router;
