import Fruit from "../models/Fruit.js";

export const getAllFruits = async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.json(fruits);
  } catch (error) {
    console.error("Error fetching fruits:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createFruit = async (req, res) => {
  const { name, price, quantity } = req.body;
  const newFruit = new Fruit({ name, price, quantity });

  try {
    const fruit = await newFruit.save();
    res.status(201).json(fruit);
  } catch (error) {
    console.error("Error saving fruit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateFruit = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;

  try {
    const fruit = await Fruit.findByIdAndUpdate(id, { name, price, quantity }, { new: true });
    if (!fruit) {
      return res.status(404).json({ error: "Fruit not found" });
    }
    res.json(fruit);
  } catch (error) {
    console.error("Error updating fruit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteFruit = async (req, res) => {
  const { id } = req.params;

  try {
    const fruit = await Fruit.findByIdAndDelete(id);
    if (!fruit) {
      return res.status(404).json({ error: "Fruit not found" });
    }
    res.json({ message: "Fruit deleted successfully" });
  } catch (error) {
    console.error("Error deleting fruit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};