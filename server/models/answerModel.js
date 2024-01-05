// models/answer.js
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;