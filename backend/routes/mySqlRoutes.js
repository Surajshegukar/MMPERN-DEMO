const exporess = require('express');
const router = exporess.Router();


const { getAllUsers,getUserById, createUser, updateUser, deleteUser } = require('../controllers/mysqlController');

router.get('/mysql/users', getAllUsers);
router.get('/mysql/users/:id', getUserById);
router.post('/mysql/users', createUser);
router.put('/mysql/users/:id', updateUser);
router.delete('/mysql/users/:id', deleteUser);

module.exports = router;