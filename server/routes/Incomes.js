const express = require("express");
const router = express.Router();
const Sequelize = require('sequelize');
const moment = require("moment");
const { Incomes } = require("../models");

// Request to get all incomes
router.get("/", async (req, res) => {
    try {
        const listOfIncomes = await Incomes.findAll({
            order: [["ID", "ASC"]], // Sort by Num column in descending order
        });
        res.json(listOfIncomes);
    } catch (error) {
        console.error("Error fetching incomes:", error);
        res.status(500).json({ error: "Server error" });
    }
});


router.post("/", async (req, res) => {
    try {
        const income = req.body;
        await Incomes.create(income);
        res.json(income);
    } catch (error) {
        console.error("Error creating income:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/chartdata/:year", async (req, res) => {
    const { year } = req.params;
    const incomeByMonth = [];

    try {
        for (let month = 1; month <= 12; month++) {
            // Calculate start and end dates for the month in the current year
            const startDateCurrentYear = moment(new Date(year, month - 1, 1)).format('YYYY-MM-DD');
            const endDateCurrentYear = moment(new Date(year, month, 0)).format('YYYY-MM-DD'); // Last day of the month
            // Calculate start and end dates for the same month in the previous year
            const startDateLastYear = moment(new Date(year - 1, month - 1, 1)).format('YYYY-MM-DD');
            const endDateLastYear = moment(new Date(year - 1, month, 0)).format('YYYY-MM-DD'); // Last day of the month

            // Sum revenue for the specified month in the current year
            const currentYearIncome = await Incomes.sum('Amount', {
                where: {
                    InputDate: {
                        [Sequelize.Op.between]: [startDateCurrentYear, endDateCurrentYear]
                    }
                }
            });

            // Sum revenue for the specified month in the previous year
            const lastYearIncome = await Incomes.sum('Amount', {
                where: {
                    InputDate: {
                        [Sequelize.Op.between]: [startDateLastYear, endDateLastYear]
                    }
                }
            });

            incomeByMonth.push({
                month,
                year,
                currentYearIncome: currentYearIncome || 0,
                lastYearIncome: lastYearIncome || 0,
            });
        }

        // Send the revenue data as a JSON response
        res.json(incomeByMonth);
    } catch (error) {
        console.error('Error fetching Incomes for year:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;