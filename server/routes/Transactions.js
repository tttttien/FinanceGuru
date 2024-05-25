const express = require("express");
const router = express.Router();
const { Transactions, Products, Users } = require("../models");

router.get("/", async (req, res) => {
    try {
      const listOfTransactions = await Transactions.findAll({
        order: [['ID', 'DESC']] // Sort by ID column in descending order
      });
      res.json(listOfTransactions);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Server error' });
    }
});
router.get("/Sell", async (req, res) => {
    try {
      const listOfTransactions = await Transactions.findAll({
        where: { Type: 'Sell' },
        order: [['ID', 'DESC']] // Sort by ID column in descending order
      });
      res.json(listOfTransactions);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Server error' });
    }
});
router.get("/Sell/:id", async (req, res) => {
    try {
        const transactionID = req.params.id;
        const listOfTransactions = await Transactions.findAll({
            where: { ProductID: transactionID, Type: 'Sell' },
            include: [
                { model: Products },
                { model: Users }
            ],
            order: [['ID', 'DESC']] // Sort by ID column in descending order
        });
        res.json(listOfTransactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get("/Buy/:id", async (req, res) => {
  try {
      const transactionID = req.params.id;
      const listOfTransactions = await Transactions.findAll({
          where: { ProductID: transactionID, Type: 'Buy' },
          include: [
              { model: Products },
              { model: Users }
          ],
          order: [['ID', 'DESC']] // Sort by ID column in descending order
      });
      res.json(listOfTransactions);
  } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Server error' });
  }
});

router.get("/Buy", async (req, res) => {
    try {
      const listOfTransactions = await Transactions.findAll({
        where: { Type: 'Buy' },
        order: [['ID', 'DESC']] // Sort by ID column in descending order
      });
      res.json(listOfTransactions);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Server error' });
    }
});

router.post("/", async (req, res) => {
  try {
    const { ProductID, UserID, Price, Type, Quantity } = req.body;
    const transaction = await Transactions.create({ ProductID, UserID, Price, Type, Quantity });
    res.json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "An error occurred while creating the transaction." });
  }
});


module.exports = router;
