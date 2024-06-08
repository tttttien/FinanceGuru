const express = require("express");
const router = express.Router();
const Sequelize = require('sequelize');
const { Expenses } = require("../models");
const moment = require('moment');

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


router.get("/chartdata/:year", async (req, res) => {
    const { year } = req.params;
    const expenseByMonth = [];

    try {
        for (let month = 1; month <= 12; month++) {
            // Calculate start and end dates for the month in the current year
            const startDateCurrentYear = moment(new Date(year, month - 1, 1)).format('YYYY-MM-DD');
            const endDateCurrentYear = moment(new Date(year, month, 0)).format('YYYY-MM-DD'); // Last day of the month
            // Calculate start and end dates for the same month in the previous year
            const startDateLastYear = moment(new Date(year - 1, month - 1, 1)).format('YYYY-MM-DD');
            const endDateLastYear = moment(new Date(year - 1, month, 0)).format('YYYY-MM-DD'); // Last day of the month

            // Sum revenue for the specified month in the current year
            const currentYearExpense = await Expenses.sum('Amount', {
                where: {
                    InputDate: {
                        [Sequelize.Op.between]: [startDateCurrentYear, endDateCurrentYear]
                    }
                }
            });

            // Sum revenue for the specified month in the previous year
            const lastYearExpense = await Expenses.sum('Amount', {
                where: {
                    InputDate: {
                        [Sequelize.Op.between]: [startDateLastYear, endDateLastYear]
                    }
                }
            });

            expenseByMonth.push({
                month,
                year,
                currentYearExpense: currentYearExpense || 0,
                lastYearExpense: lastYearExpense || 0,
            });
        }

        // Send the revenue data as a JSON response
        res.json(expenseByMonth);
    } catch (error) {
        console.error('Error fetching Expenses for year:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



router.get("/total", async (req, res) => {
    try {
        const totalExpense = await Expenses.sum('Amount');
        // Sử dụng phương thức sum() của Sequelize để tính tổng của trường 'Amount' trong tất cả các bản ghi

        res.json({ totalExpense });
    } catch (error) {
        console.error('Error calculating total expense:', error);
        res.status(500).json({ error: 'An error occurred while calculating total expense' });
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
