const userProfile = require('../models/userProfile');

async function findMatchingUsers(userId) {
  try { 
    const userNeed = await userProfile.findOne({ createdBy: userId }).populate('createdBy');

    if (!userNeed || !userNeed.createdBy) {
      throw new Error('UserProfile not found');
    }

    const currentUserSkills = userNeed.skills ?? [];
    const currentUserInterests = userNeed.interests ?? [];

    const pipeline = [
      {
        $match: {
          $or: [
            {
              skills: { $in: currentUserInterests }
            },
            {
              interests: { $in: currentUserSkills }
            }
          ]
        }
      },
      {
        $addFields: {
          similarityScore: {
            $size: {
              $setIntersection: [currentUserSkills, "$skills"]
            }
          }
        }
      },
      {
        $sort: { similarityScore: -1 }
      }
    ];

    const matchingUsers = await userProfile.aggregate(pipeline);
    if (matchingUsers.length === 0) {
      return "Sorry, we don't have a good match for you, but we'd love to see you again!";
    }
    
    return matchingUsers;
  } catch (error) {
    console.error({ error: error.message });
  }
}

module.exports = {
  findMatchingUsers,
};
