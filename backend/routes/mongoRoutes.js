const express = require('express');
const router = express.Router();

const { getAllItems,getItemById, createItem, updateItem, deleteItem } = require('../controllers/mongoController');


router.get('/mongo/items', getAllItems);
router.get('/mongo/items/:id', getItemById);
router.post('/mongo/items', createItem);
router.put('/mongo/items/:id', updateItem);
router.delete('/mongo/items/:id', deleteItem);


module.exports = router;


