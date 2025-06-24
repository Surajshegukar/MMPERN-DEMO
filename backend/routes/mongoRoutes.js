const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Item = require('../models/mongoModel');

// Validation rules
const itemValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
];

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching items' });
  }
});

// GET item by ID
router.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching item' });
  }
});

// POST new item
router.post('/items', itemValidationRules, validateRequest, async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newItem = new Item({ name, description, price });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating item', error });
  }
});

// PUT update item
router.put('/items/:id', itemValidationRules, validateRequest, async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error });
  }
});

// DELETE item
router.delete('/items/:id', async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting item' });
  }
});

router.post('/ajax/items', async (req, res) => {
  const draw = parseInt(req.body.draw) || 1;
  const start = parseInt(req.body.start) || 0;
  const length = parseInt(req.body.length) || 10;
  const order = req.body.order || [];
  const searchValue = req.body.search?.value || '';

  const colIndex = order[0]?.column || 0;
  const dir = order[0]?.dir === 'asc' ? 1 : -1;
  const columns = ['name', 'description', 'price'];
  const sortField = columns[colIndex] || 'name';

  const query = {
    $or: [
      { name: { $regex: searchValue, $options: 'i' } },
      { description: { $regex: searchValue, $options: 'i' } },
    ],
  };

  const total = await Item.countDocuments();
  const filtered = await Item.countDocuments(query);
  const docs = await Item.find(query)
    .sort({ [sortField]: dir })
    .skip(start)
    .limit(length);

  const data = docs.map((item, i) => [
    start + i + 1,
    item.name,
    item.description,
    item.price,

  ]);

  res.json({
    draw,
    recordsTotal: total,
    recordsFiltered: filtered,
    data,
  });
});

module.exports = router;