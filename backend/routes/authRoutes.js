
const express = require('express');
const { registerUser, loginUser, updateUserProfile, getProfile } = require('../controllers/authController');
const { addItem } = require('../controllers/productItemController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
