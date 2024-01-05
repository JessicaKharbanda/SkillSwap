const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');

// Controller function to post a new question
const postQuestion = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId; // Assuming you have user information stored in req.user after authentication

  try {
    const question = await Question.create({
      user: userId,
      title,
      content,
    });

    res.status(201).json({ question });
  } catch (error) {
    res.status(500).json({ error: 'Failed to post the question' });
  }
};
// const getQuestions = async (req, res) => {
//     try {
//       const questions = await Question.find().populate({
//         path: 'answers',
//         select: 'content',  // Select the fields you want to populate for answers
//       }).populate('user', 'name');
  
//       res.status(200).json({ questions });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch questions' });
//     }
//   };


const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate({
      path: 'answers',
      select: 'content user',  // Select the fields you want to populate for answers, including 'user'
      populate: {
        path: 'user',
        select: 'name',  // Select the fields you want to populate for the user in each answer
      }
    }).populate('user', 'name');

    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};
  

// Controller function to post an answer to a question
const postAnswer = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.userId; // Assuming you have user information stored in req.user after authentication
  const questionId = req.params.questionId;

  try {
    const answer = await Answer.create({
      user: userId,
      content,
    });

    await Question.findByIdAndUpdate(
      questionId,
      { $push: { answers: answer._id } },
      { new: true }
    );

    res.status(201).json({ answer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to post the answer' });
  }
};

module.exports = { postQuestion, getQuestions, postAnswer };