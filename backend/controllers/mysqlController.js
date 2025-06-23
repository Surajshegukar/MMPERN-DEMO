const {body, validationResult} = require('express-validator');
const userModel = require('../models/mySqlModel');
const { Op } = require('sequelize');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};
// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Create a new user
const createUser = async (req, res) => {
  // Validate request body
  await body('name').notEmpty().withMessage('Name is required').run(req);
  await body('email').isEmail().withMessage('Valid email is required').run(req);
  await body('password').notEmpty().withMessage('Password is required').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newUser = await userModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Update a user

const updateUser = async (req, res) => {

  const { id } = req.params;
  // Validate request body
  await body('name').optional().notEmpty().withMessage('Name cannot be empty').run(req);
  await body('email').optional().isEmail().withMessage('Valid email is required').run(req);
  await body('password').optional().notEmpty().withMessage('Password cannot be empty').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [updated] = await userModel.update(req.body, {
      where: { id }
    });
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedUser = await userModel.findByPk(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await userModel.destroy({
      where: { id }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};