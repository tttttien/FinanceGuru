// const express = require("express");
// const router = express.Router();
// const Sequelize = require('sequelize');
// const { Incomes } = require("../models");

// // Request to get all expenses
// router.get("/", async (req, res) => {
//     try {
//         const listOfIncomes = await Incomes.findAll({
//             order: [["ID", "ASC"]], // Sort by Num column in descending order
//         });
//         res.json(listOfIncomes);
//     } catch (error) {
//         console.error("Error fetching incomes:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// });


// router.post("/", async (req, res) => {
//     try {
//         const income = req.body;
//         await Incomes.create(income);
//         res.json(income);
//     } catch (error) {
//         console.error("Error creating income:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// });