const { body, validationResult } = require("express-validator");
const userModel = require("../models/mySqlModel");
const { Op } = require("sequelize");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Create a new user
const createUser = async (req, res) => {
  // Validate request body
  await body("name").notEmpty().withMessage("Name is required").run(req);
  await body("email").isEmail().withMessage("Valid email is required").run(req);
  await body("password")
    .notEmpty()
    .withMessage("Password is required")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newUser = await userModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Update a user

const updateUser = async (req, res) => {
  const { id } = req.params;
  // Validate request body
  await body("name")
    .optional()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .run(req);
  await body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required")
    .run(req);
  await body("password")
    .optional()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [updated] = await userModel.update(req.body, {
      where: { id },
    });
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await userModel.findByPk(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await userModel.destroy({
      where: { id },
    });
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

const getAjaxItems = async (req, res) => {
  const draw = parseInt(req.body.draw) || 1;
  const start = parseInt(req.body.start) || 0;
  const length = parseInt(req.body.length) || 10;
  const order = req.body.order || [];
  const searchValue = req.body.search?.value || "";

  const colIndex = order[0]?.column || 0;
  const dir = order[0]?.dir === "asc" ? "ASC" : "DESC";
  const columns = ["name", "description", "price"];
  const sortField = columns[colIndex] || "name";

const whereClause = searchValue
  ? {
      [Op.or]: [
        { name: { [Op.like]: `%${searchValue}%` } },
        { email: { [Op.like]: `%${searchValue}%` } },
      ],
    }
  : {};


  const total = await userModel.count();
  const filtered = await userModel.count({ where: whereClause });

  const docs = await userModel.findAll({
    where: whereClause,
    order: [[sortField, dir]],
    offset: start,
    limit: length,
  });

  const data = docs.map((user, i) => [
    start + i + 1,
    user.name,
    user.email,
    user.password,
    user._id,
  ]);

  res.json({
    draw,
    recordsTotal: total,
    recordsFiltered: filtered,
    data,
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAjaxItems,
};
