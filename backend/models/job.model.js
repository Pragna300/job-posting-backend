const pool = require('../config/db');

class Job {
  static async create(jobData) {
    const { title, description, company_id, salary_min, salary_max, location, type } = jobData;
    const [result] = await pool.execute(
      'INSERT INTO jobs (title, description, company_id, salary_min, salary_max, location, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, company_id, salary_min, salary_max, location, type]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.execute(`
      SELECT j.*, c.name as company_name, c.logo_url
      FROM jobs j
      JOIN companies c ON j.company_id = c.id
      WHERE j.status = 'open'
      ORDER BY j.created_at DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute(`
      SELECT j.*, c.name as company_name, c.logo_url, c.about as company_about
      FROM jobs j
      JOIN companies c ON j.company_id = c.id
      WHERE j.id = ?
    `, [id]);
    return rows[0];
  }

  static async findByCompanyId(companyId) {
    const [rows] = await pool.execute('SELECT * FROM jobs WHERE company_id = ? ORDER BY created_at DESC', [companyId]);
    return rows;
  }

  static async update(id, jobData) {
    const { title, description, salary_min, salary_max, location, type, status } = jobData;
    await pool.execute(
      'UPDATE jobs SET title = ?, description = ?, salary_min = ?, salary_max = ?, location = ?, type = ?, status = ? WHERE id = ?',
      [title, description, salary_min, salary_max, location, type, status, id]
    );
  }

  static async delete(id) {
    await pool.execute('DELETE FROM jobs WHERE id = ?', [id]);
  }
}

module.exports = Job;