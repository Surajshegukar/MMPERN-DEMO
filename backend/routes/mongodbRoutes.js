
const express = require('express');
const router = express.Router();
const MongoDBController = require('../controllers/mongoDBController.js');
const multer = require('multer');
const { body , validationResult } = require('express-validator');

const { getAllUsers,getUserById, createUser, updateUser, deleteUser, getAjaxUsers  } = require('../controllers/mongoDBController.js');

const userValidationRules = [
  body("firstName")
    .notEmpty().withMessage("First name is required")
    .isAlpha().withMessage("First name must contain only letters"),

  body("lastName")
    .notEmpty().withMessage("Last name is required")
    .isAlpha().withMessage("Last name must contain only letters"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Must be a valid email address"),

  body("dob")
    .notEmpty().withMessage("Date of birth is required")
    // .isISO8601().toDate().withMessage("Date of birth must be a valid date")
    ,

  body("mobileNumber")
    .notEmpty().withMessage("Mobile number is required")
    .matches(/^[0-9]{10}$/).withMessage("Mobile number must be 10 digits"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/).withMessage("Must contain at least one lowercase letter")
    .matches(/[A-Z]/).withMessage("Must contain at least one uppercase letter")
    .matches(/\d/).withMessage("Must contain at least one digit")
    .matches(/[@$!%*?&]/).withMessage("Must contain at least one special character"),

  body("address")
    .notEmpty().withMessage("Address is required")
    .isString().withMessage("Address must be a string"),

  body("profilePhoto")
    .optional()
    .isString().withMessage("Profile photo must be a valid filename or URL"),
];
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Configure file upload for profile photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

// Create a new user with profile photo
router.post('/users', upload.single('profilePhoto'),userValidationRules,validateRequest, createUser);

// Get all users
router.get('/users', getAllUsers);

router.put('/users/:id',userValidationRules,validateRequest, updateUser);
// Get a single user by ID
router.get('/users/:id', getUserById);

// Delete a user by ID
router.delete('/users/:id', deleteUser);

router.post('/ajax/users', getAjaxUsers);

module.exports = router;