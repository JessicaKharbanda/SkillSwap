const express = require('express');
const router = express.Router();
const { expressInterest } = require('../controllers/notifications');

// Define your API routes
router.post('/express-interest', expressInterest);

module.exports = router;
