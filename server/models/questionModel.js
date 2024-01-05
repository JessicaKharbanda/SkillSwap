// models/question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  title: { 
    type: String, 
    required: true 
},
  content: { 
    type: String, 
    required: true 
},
  answers: [
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Answer' 
    }
],
  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;