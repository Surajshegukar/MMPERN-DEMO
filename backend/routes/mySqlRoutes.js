const exporess = require('express');
const router = exporess.Router();
const { body, validationResult } = require("express-validator");

const { getAllUsers,getUserById, createUser, updateUser, deleteUser ,getAjaxItems } = require('../controllers/mysqlController');

const userValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),
];
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', userValidationRules, validateRequest, createUser);
router.put('/users/:id', userValidationRules, validateRequest, updateUser);
router.delete('/users/:id', deleteUser);

router.post("/ajax/users", getAjaxItems);

module.exports = router;