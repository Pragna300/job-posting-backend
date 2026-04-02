const pool = require('../config/db');

class Application {
  static async create(applicationData) {
    const { job_id, user_id, cover_letter, resume_url } = applicationData;
    const [result] = await pool.execute(
      'INSERT INTO applications (job_id, user_id, cover_letter, resume_url) VALUES (?, ?, ?, ?)',
      [job_id, user_id, cover_letter, resume_url]
    );
    return result.insertId;
  }

  static async findByUserAndJob(userId, jobId) {
    const [rows] = await pool.execute('SELECT * FROM applications WHERE user_id = ? AND job_id = ?', [userId, jobId]);
    return rows[0];
  }

  static async findByUserId(userId) {
    const [rows] = await pool.execute(`
      SELECT a.*, j.title as job_title, c.name as company_name
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      JOIN companies c ON j.company_id = c.id
      WHERE a.user_id = ?
      ORDER BY a.applied_at DESC
    `, [userId]);
    return rows;
  }

  static async findByJobId(jobId) {
    const [rows] = await pool.execute(`
      SELECT a.*, u.name, u.email, u.profile_pic, u.resume_url, u.skills
      FROM applications a
      JOIN users u ON a.user_id = u.id
      WHERE a.job_id = ?
      ORDER BY a.applied_at DESC
    `, [jobId]);
    return rows;
  }

  static async updateStatus(id, status) {
    await pool.execute('UPDATE applications SET status = ? WHERE id = ?', [status, id]);
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM applications WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Application;