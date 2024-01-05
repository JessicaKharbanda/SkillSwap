// controllers/matchingController.js
const { findMatchingUsers } = require('../services/matchingAlgorithm'); // Import your matching function

// Define a controller function that will be called when the endpoint is hit
const getMatchingUsers = async (req, res) => {
  try {
    const userId = req.user.userId;
    // console.log(userId);
    const matchedUsers = await findMatchingUsers(userId);
    // Send the matched users as a response
    res.json(matchedUsers);
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getMatchingUsers };
