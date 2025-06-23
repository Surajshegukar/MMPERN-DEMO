const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/postgresController');
router.get('/postgres/user', getAllUsers);
router.get('/postgres/user/:id', getUserById);
router.post('/postgres/user', createUser);
router.put('/postgres/user/:id', updateUser);
router.delete('/postgres/user/:id', deleteUser);


module.exports = router;