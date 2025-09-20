import asyncHandler from "express-async-handler";
import Sweet from "../models/sweet.model.js";
import { smartSearchQuery } from "../utils/aiSearch.js";

export const addSweet = asyncHandler(async (req, res) => {
  const { name, category, price, quantity } = req.body;
  const sweet = await Sweet.create({ name, category, price, quantity });
  res.status(201).json(sweet);
});

export const getAllSweets = asyncHandler(async (req, res) => {
  const sweets = await Sweet.find();
  res.status(200).json(sweets);
});

export const searchSweets = asyncHandler(async (req, res) => {
  const { query, category, minPrice, maxPrice } = req.query;
  const searchQuery = {};

  let keywords = [];
  if (query) {
    keywords = await smartSearchQuery(query); 
    searchQuery.name = { $in: keywords.map(k => new RegExp(k, "i")) };
  }

  if (category) searchQuery.category = category;
  if (minPrice || maxPrice) searchQuery.price = {};
  if (minPrice) searchQuery.price.$gte = Number(minPrice);
  if (maxPrice) searchQuery.price.$lte = Number(maxPrice);

  const sweets = await Sweet.find(searchQuery);
  res.status(200).json(sweets);
});

export const updateSweet = asyncHandler(async (req, res) => {
  const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!sweet) {
    res.status(404);
    throw new Error("Sweet not found");
  }
  res.status(200).json(sweet);
});

export const deleteSweet = asyncHandler(async (req, res) => {
  const sweet = await Sweet.findByIdAndDelete(req.params.id);
  if (!sweet) {
    res.status(404);
    throw new Error("Sweet not found");
  }
  res.status(200).json({ message: "Sweet deleted successfully" });
});

export const purchaseSweet = asyncHandler(async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) {
    res.status(404);
    throw new Error("Sweet not found");
  }
  if (sweet.quantity <= 0) {
    res.status(400);
    throw new Error("Sweet out of stock");
  }
  sweet.quantity -= 1;
  await sweet.save();
  res.status(200).json(sweet);
});

export const restockSweet = asyncHandler(async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) {
    res.status(404);
    throw new Error("Sweet not found");
  }
  const { quantity } = req.body;
  sweet.quantity += Number(quantity);
  await sweet.save();
  res.status(200).json(sweet);
});
