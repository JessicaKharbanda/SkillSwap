// const express = require('express');
// const router = express.Router();
// const {createOrUpdateTaskList,getTaskListsForLoggedInUser,getTaskListsForMatchedUser, completeTask} = require('../controllers/tasklist');

// // Create or update task list for a user
// router.post('/task-lists/:receiverId', createOrUpdateTaskList);

// // Get task lists created-for and created-by logged-in user
// router.get('/task-lists', getTaskListsForLoggedInUser);

// // Get task lists created by the matched user for the logged-in user
// router.get('/task-lists/matched-user/:partnerId', getTaskListsForMatchedUser);

// // Complete a task and update rewards
// router.put('/task-lists/complete-task/:taskId', completeTask);

// module.exports = router;



const express = require('express');
const router = express.Router();
const {createOrUpdateTaskList,getTaskListsForLoggedInUser,getTaskListsForMatchedUser, completeTask} = require('../controllers/tasklist');

// Create or update task list for a user
router.post('/task-lists/:receiverId', createOrUpdateTaskList);

// Get task lists created-for and created-by logged-in user
router.get('/task-lists', getTaskListsForLoggedInUser);

// Get task lists created by the matched user for the logged-in user
router.get('/task-lists/matched-user/:partnerId', getTaskListsForMatchedUser);

// Complete a task and update rewards
router.put('/task-lists/complete-task/:taskId', completeTask);

module.exports = router;