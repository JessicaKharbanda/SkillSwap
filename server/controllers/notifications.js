const UserModel = require('../models/User');
const { sendInterestEmail} = require('../utils/notifications');

async function expressInterest(req, res) {
  try {
    const { targetUserId } = req.body;
    const currentUser = req.user; // Assuming you're using a user authentication system
    console.log(currentUser);
    // Update the user's interests
    await UserModel.updateOne({ _id: currentUser._id }, { $addToSet: { interests: targetUserId } });

    // Send notifications to the target user
    sendInterestEmail(targetUserId);

    res.status(200).json({ message: 'Interest expressed and notifications sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { expressInterest };
