const express = require("express");
const router = express.Router();

const { Expenses } = require("../models");

// Request to get all expenses
router.get("/", async (req, res) => {
    try {
        const listOfExpenses = await Expenses.findAll({
            order: [["ID", "ASC"]], // Sort by Num column in descending order
        });
        res.json(listOfExpenses);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ error: "Server error" });
    }
});




router.post("/", async (req, res) => {
    try {
        const expense = req.body;
        await Expenses.create(expense);
        res.json(expense);
    } catch (error) {
        console.error("Error creating expense:", error);
        res.status(500).json({ error: "Server error" });
    }
});


router.get("/salary", async (req, res) => {
    try {
        const filterSalary = await Expenses.findAll({
            where: { Category: "Salary" }, // Filter by status
            order: [["ID", "DESC"]], // Sort by Num column in ascending order
        });
        res.json(filterSalary);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ error: "Server error" });
    }
});



router.get("/total-amount", async (req, res) => {
    try {
        // Calculate the total amount using Sequelize.sum
        const totalAmount = await Expenses.sum("amount");

        // Send the total amount as JSON response
        res.json({ totalAmount });
    } catch (error) {
        console.error("Error fetching total amount:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.get('/chart-data', async (req, res) => {
    try {
        // Use Expenses model to fetch specific columns
        const expensesData = await Expenses.findAll({
            attributes: ['InputDate', 'Amount'],
        });

        // Send data as is to client
        res.json(expensesData);
    } catch (error) {
        console.error('Error fetching chart data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/filter", async (req, res) => {
    const { Category, month, year } = req.query; // Sử dụng req.query thay vì req.body
    try {
        const expenses = await Expenses.findAll({
            where: { Category: Category }, // Lọc theo Category
            order: [["ID", "DESC"]], // Sắp xếp theo cột ID giảm dần
        });

        for (const expense of expenses) {
            const data = expense.InputDate;
            const [datayear, datamonth] = data.split("-").map(Number);
            if (datayear === parseInt(year) && datamonth === parseInt(month)) {
                console.log(expense);
                res.json(expenses);
            }
        }
    } catch (error) {
        console.error('Error updating invoice:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



router.get("/others", async (req, res) => {
    try {
        const filterOthers = await Expenses.findAll({
            where: { Category: "Others" }, // Filter by status
            order: [["ID", "DESC"]], // Sort by Num column in ascending order
        });
        res.json(filterOthers);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ error: "Server error" });
    }
});





router.delete('/delete/:ExpenseId', async (req, res) => {
    try {
        const deletedCount = await Expenses.destroy({
            where: { id: req.params.ExpenseId },
        });
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.json({ message: 'Expense deleted' });
    } catch (error) {
        console.error('Error deleting Expense:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
