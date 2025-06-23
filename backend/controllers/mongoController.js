// MongoDB Controller for CRUD operations
const {body, validationResult} = require('express-validator');
const mongoose = require('mongoose');
const Item = require('../models/mongoModel'); // Assuming you have an Item model defined



// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);
    if (!item) {  
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error });
  }
};

// Create a new item
const createItem = async (req, res) => {
  // Validate request body
  await body('name').notEmpty().withMessage('Name is required').run(req);
  await body('description').notEmpty().withMessage('Description is required').run(req);
  await body('price').isNumeric().withMessage('Price must be a number').run(req);
  
  const errors = validationResult(req);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error });
  }
};

// Update an item
const updateItem = async (req, res) => {
  const { id } = req.params;
  // Validate request body
  await body('name').optional().notEmpty().withMessage('Name cannot be empty').run(req);
  await body('description').optional().notEmpty().withMessage('Description cannot be empty').run(req);
  await body('price').optional().isNumeric().withMessage('Price must be a number').run(req);
  
  const errors = validationResult(req);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
}

// Export the controller functions
module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
