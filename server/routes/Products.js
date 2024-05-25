const express = require("express");
const router = express.Router();
const { Products } = require("../models");

// Request to get all products
router.get("/", async (req, res) => {
  try {
    const listOfProducts = await Products.findAll({
      order: [["ID", "DESC"]], // Sort by ID column in descending order
    });
    res.json(listOfProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get products of type Mod
router.get("/Mod", async (req, res) => {
  try {
    const products = await Products.findAll({
      where: { Type: "Mod" },
      order: [["Name", "ASC"]], // Sort by Name column in ascending order
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching Mod products:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get products of type Weapon
router.get("/Weapon", async (req, res) => {
  try {
    const products = await Products.findAll({
      where: { Type: "Weapon" },
      order: [["Name", "ASC"]], // Sort by Name column in ascending order
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching Weapon products:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get products of type Warframe
router.get("/Warframe", async (req, res) => {
  try {
    const products = await Products.findAll({
      where: { Type: "Warframe" },
      order: [["Name", "ASC"]], // Sort by Name column in ascending order
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching Warframe products:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const products = await Products.findOne({
      where: { Name: req.params.name },
    });
    if (!products) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching Product by Name:", error);
    console.log("500");
    res.status(500).json({ error: "Server error" });
  }
});

// Request to create a new product
router.post("/", async (req, res) => {
  const product = req.body;
  await Products.create(product);
  res.json(product);
});

module.exports = router;
