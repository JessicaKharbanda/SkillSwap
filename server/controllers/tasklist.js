// const TaskList = require('../models/tasklist');
// const ChatRequest = require('../models/chatRequest');

// // Create or update task list for a user
// const createOrUpdateTaskList = async (req, res) => {
//   try {
//     const receiverId = req.params.receiverId;
//     const senderId = req.user.userId;
//     const { tasks } = req.body;

//     // Check if the match is confirmed
//     const isMatchConfirmed = await ChatRequest.exists({
//       $or: [
//         { sender: senderId, receiver: receiverId, status: 'Accepted' },
//         { sender: receiverId, receiver: senderId, status: 'Accepted' },
//       ],
//     });

//     if (!isMatchConfirmed) {
//       return res.status(403).json({ error: 'Match not confirmed' });
//     }

//     // Create a new task list for the matched user
//     const userTaskList = new TaskList({ sender: senderId, receiver: receiverId, tasks });
//     await userTaskList.save();

//     res.status(201).json(userTaskList);
//   } catch (error) {
//     res.status(500).json({ error: 'Unable to create task list' });
//   }
// };

// // Get task lists created for the logged-in user
// const getTaskListsForLoggedInUser = async (req, res) => {
//   try {
//     const loggedInUserId = req.user.userId;

//     // Fetch the task lists for the logged-in user
//     const userTaskLists = await TaskList.find({
//       $or: [{ sender: loggedInUserId }, { receiver: loggedInUserId }],
//     }).populate('sender receiver', 'name');

//     res.status(200).json({ userTaskLists });
//   } catch (error) {
//     res.status(500).json({ error: 'Unable to fetch task lists' });
//   }
// };

// // Get task lists created by the matched user for the logged-in user
// const getTaskListsForMatchedUser = async (req, res) => {
//   try {
//     const loggedInUserId = req.user.userId;
//     const partnerId = req.params.partnerId;

//     // Check if the match is confirmed
//     const isMatchConfirmed = await ChatRequest.exists({
//       $or: [
//         { sender: loggedInUserId, receiver: partnerId, status: 'Accepted' },
//         { sender: partnerId, receiver: loggedInUserId, status: 'Accepted' },
//       ],
//     });

//     if (!isMatchConfirmed) {
//       return res.status(403).json({ error: 'Match not confirmed' });
//     }

//     // Fetch the task list created by the partner for the logged-in user
//     const partnerTaskList = await TaskList.findOne({
//       sender: partnerId,
//       receiver: loggedInUserId,
//     }).populate('sender', 'name');

//     res.status(200).json({ partnerTaskList });
//   } catch (error) {
//     res.status(500).json({ error: 'Unable to fetch task list' });
//   }
// };


// // Complete a task and update rewards
// const completeTask = async (req, res) => {
//   try {
//     const loggedInUserId = req.user.userId;
//     const taskId = req.params.taskId;

//     // Find the task list that belongs to the logged-in user and has the specified task
//     const taskList = await TaskList.findOne({
//       $or: [
//         { sender: loggedInUserId, 'tasks._id': taskId },
//         { receiver: loggedInUserId, 'tasks._id': taskId },
//       ],
//     });
//    console.log(taskList);
//     if (!taskList) {
//       return res.status(404).json({ error: 'Task list not found or task not in the list' });
//     }

//     // Find the specific task by ID
//     const task = taskList.tasks.find(t => t._id.toString() === taskId);

//     if (!task) {
//       return res.status(404).json({ error: 'Task not found in the task list' });
//     }

//     // Check if the task is not already completed
//     if (!task.completed) {
//       // Mark the task as completed
//       task.completed = true;

//       // Check if the task is completed before the deadline
//       if (task.deadline >= new Date()) {
//         // Increment rewards only if the task is completed on time
//         taskList.rewards += 1;

//         // Save the task list with the updated rewards
//         await taskList.save();
//       }
//     }

//     res.status(200).json(taskList);
//   } catch (error) {
//     res.status(500).json({ error: 'Unable to complete the task' });
//   }
// };




// module.exports = {
//   createOrUpdateTaskList,
//   getTaskListsForLoggedInUser,
//   getTaskListsForMatchedUser,
//   completeTask,
// };




const TaskList = require('../models/tasklist');
const ChatRequest = require('../models/chatRequest');

// Create or update task list for a user
const createOrUpdateTaskList = async (req, res) => {
  try {
    const receiverId = req.params.receiverId;
    const senderId = req.user.userId;
    const { tasks } = req.body;

    // Check if the match is confirmed
    const isMatchConfirmed = await ChatRequest.exists({
      $or: [
        { sender: senderId, receiver: receiverId, status: 'Accepted' },
        { sender: receiverId, receiver: senderId, status: 'Accepted' },
      ],
    });

    if (!isMatchConfirmed) {
      return res.status(403).json({ error: 'Match not confirmed' });
    }

    // Create a new task list for the matched user
    const userTaskList = new TaskList({ sender: senderId, receiver: receiverId, tasks });
    await userTaskList.save();

    res.status(201).json(userTaskList);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create task list' });
  }
};

// Get task lists created for the logged-in user
const getTaskListsForLoggedInUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;

    // Fetch the task lists for the logged-in user
    const userTaskLists = await TaskList.find({
      $or: [{ sender: loggedInUserId }, { receiver: loggedInUserId }],
    }).populate('sender receiver', 'name');

    res.status(200).json({ userTaskLists });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch task lists' });
  }
};

// Get task lists created by the matched user for the logged-in user
const getTaskListsForMatchedUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;
    const partnerId = req.params.partnerId;

    // Check if the match is confirmed
    const isMatchConfirmed = await ChatRequest.exists({
      $or: [
        { sender: loggedInUserId, receiver: partnerId, status: 'Accepted' },
        { sender: partnerId, receiver: loggedInUserId, status: 'Accepted' },
      ],
    });

    if (!isMatchConfirmed) {
      return res.status(403).json({ error: 'Match not confirmed' });
    }

    // Fetch the task list created by the partner for the logged-in user
    const partnerTaskList = await TaskList.findOne({
      sender: partnerId,
      receiver: loggedInUserId,
    }).populate('sender', 'name');

    res.status(200).json({ partnerTaskList });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch task list' });
  }
};

// Complete a task and update rewards
const completeTask = async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;
    const taskId = req.params.taskId;

    // Find the task list that belongs to the logged-in user and has the specified task
    const taskList = await TaskList.findOne({
      $or: [
        { sender: loggedInUserId, 'tasks._id': taskId },
        { receiver: loggedInUserId, 'tasks._id': taskId },
      ],
    });
    // console.log(taskList)
    if (!taskList) {
      return res.status(404).json({ error: 'Task list not found or task not in the list' });
    }

    // Find the specific task by ID
    const task = taskList.tasks.find(t => t._id.toString() === taskId);
// console.log(task);
    if (!task) {
      return res.status(404).json({ error: 'Task not found in the task list' });
    }

    // Check if the task is not already completed
    if (!task.completed) {
      // Mark the task as completed
      task.completed = true;

      // Check if the task is completed before the deadline
      if (task.deadline >= new Date()) {
        // Increment rewards only if the task is completed on time
        taskList.rewards += 1;

        // Save the task list with the updated rewards
        await taskList.save();
      }
    }

    res.status(200).json(taskList);
  } catch (error) {
    res.status(500).json({ error: 'Unable to complete the task' });
  }
};


module.exports = {
  createOrUpdateTaskList,
  getTaskListsForLoggedInUser,
  getTaskListsForMatchedUser,
  completeTask,
};