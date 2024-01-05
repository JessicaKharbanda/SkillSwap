// routes/matchingRoutes.js
const express = require('express');
const router = express.Router();
const { getMatchingUsers } = require('../controllers/matchingAlgorithm');

// Define the endpoint and associate it with the controller function
router.get('/match', getMatchingUsers);

module.exports = router;
