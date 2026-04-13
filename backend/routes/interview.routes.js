const express = require('express');
const { validateToken, submitResult } = require('../controllers/interview.controller');

const router = express.Router();

// Because these endpoints are accessed from the automated interview frontend portal directly by candidates,
// they should handle their own token validity securely without requiring the standard user auth tokens

const {
  verifyUser,
  generateQuestions,
  submitInterview,
} = require("../controllers/interviewController");

router.get('/validate', validateToken);
router.post('/submit', submitResult);

router.post("/verify-user", verifyUser);
router.get("/questions/:token", generateQuestions);
router.post("/submit-ai", submitInterview);

module.exports = router;
