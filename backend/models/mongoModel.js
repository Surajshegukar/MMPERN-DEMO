// MongoDB Item Model
const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;

// example json data for MongoDB

const exampleData = [
  {
    name: "Item 1",
    description: "Description for Item 1",
    price: 10.99,
  },
  {
    name: "Item 2",
    description: "Description for Item 2",
    price: 20.49,
  },
  {
    name: "Item 3",
    description: "Description for Item 3",
    price: 15.75,
  },
];