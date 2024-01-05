// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Please provide a title'],
//   },
//   description: String,
//   deadline: {
//     type: Date,
//     required: [true, 'Please provide a deadline'],
//   },
//   completed: { type: Boolean, default: false },
// });

// const taskListSchema = new mongoose.Schema({
//   sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   tasks: [taskSchema],
//   rewards: { type: Number, default: 0 },
// });

// const TaskList = mongoose.model('TaskList', taskListSchema);

// module.exports = TaskList;



const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: String,
  deadline: {
    type: Date,
    required: [true, 'Please provide a deadline'],
  },
  priority: {
    type:String,
    enum: ['Low', 'Medium', 'High'],
    default:'Medium'
  },
  completed: { type: Boolean, default: false },
});

const taskListSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tasks: [taskSchema],
  rewards: { type: Number, default: 0 },
});

const TaskList = mongoose.model('TaskList', taskListSchema);

module.exports = TaskList;