const express = require('express');

const feedbackController = require('../service/feedback-service');
const router = express.Router();

router.post('/', feedbackController.addFeedback);
router.get('/', feedbackController.getFeedbacks);
router.post('/delete', feedbackController.removeFeedback);
router.get('/:pid', feedbackController.getFeedbacksByUserId);
module.exports = router;