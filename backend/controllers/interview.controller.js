const pool = require('../config/db');

const validateToken = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    const { rows } = await pool.query('SELECT * FROM interview_links WHERE token = $1', [token]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    const interviewLink = rows[0];

    if (interviewLink.is_used) {
      return res.status(400).json({ message: 'Token has already been used' });
    }

    if (new Date(interviewLink.expires_at) < new Date()) {
      return res.status(400).json({ message: 'Token has expired' });
    }

    res.json({ message: 'Token is valid', interviewLink });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const submitResult = async (req, res) => {
  try {
    const { token, score, feedback } = req.body;
    
    if (!token || score === undefined || !feedback) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const { rows } = await pool.query('SELECT * FROM interview_links WHERE token = $1', [token]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    const interviewLink = rows[0];

    if (interviewLink.is_used) {
      return res.status(400).json({ message: 'Interview already submitted for this token' });
    }

    // Insert result
    await pool.query(
      'INSERT INTO interview_results (user_id, application_id, score, feedback) VALUES ($1, $2, $3, $4)',
      [interviewLink.user_id, interviewLink.application_id, score, JSON.stringify(feedback)]
    );

    // Mark as used organically in order to enforce single-use links
    await pool.query(
      'UPDATE interview_links SET is_used = true WHERE id = $1',
      [interviewLink.id]
    );

    // Securely update the core ATS application so everyone knows it's fully tested
    await pool.query(
      'UPDATE applications SET status = $1, test_score = $2, test_status = $3 WHERE id = $4',
      ['test_completed', score, 'completed', interviewLink.application_id]
    );

    res.json({ message: 'Interview results submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { validateToken, submitResult };
