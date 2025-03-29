
const express = require('express');
const { addItem } = require('../controllers/productItemController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', addItem)

module.exports = router;
