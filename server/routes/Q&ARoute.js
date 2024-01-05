// routes/questionRoutes.js
const express = require('express');
const { postQuestion, getQuestions, postAnswer } = require('../controllers/Q&AController');
const autheticateUser = require('../middleware/authentication')

const router = express.Router();

router.route('/questions').post(autheticateUser, postQuestion).get(getQuestions);
router.route('/questions/:questionId/answers').post(autheticateUser, postAnswer);

module.exports = router;