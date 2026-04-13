/**
 * Routes aligned with khaleel-shnoor/AI-Interview-Panel-Backend and
 * praneeth11001/ai-interview-frontend (singular /api/interview, POST /submit).
 */
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const {
  verifyUser,
  generateQuestions,
  submitInterview,
} = require('../controllers/interviewController');

router.post('/verify-user', verifyUser);
router.get('/questions/:token', generateQuestions);
router.post('/submit', submitInterview);

router.get('/result/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const link = await pool.query(
      'SELECT * FROM interview_links WHERE token=$1',
      [token]
    );

    if (!link.rows.length) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const userId = link.rows[0].user_id;

    const result = await pool.query(
      `SELECT * FROM interview_results
       WHERE user_id=$1
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId]
    );

    if (!result.rows.length) {
      return res.json({ score: 0 });
    }

    res.json(result.rows[0].feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
