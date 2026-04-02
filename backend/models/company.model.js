const pool = require('../config/db');

class Company {
  static async create(companyData) {
    const { name, email, manager_id } = companyData;
    const [result] = await pool.execute(
      'INSERT INTO companies (name, email, manager_id) VALUES (?, ?, ?)',
      [name, email, manager_id]
    );
    return result.insertId;
  }

  static async findByManagerId(managerId) {
    const [rows] = await pool.execute('SELECT * FROM companies WHERE manager_id = ?', [managerId]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM companies');
    return rows;
  }

  static async updateProfile(id, profileData) {
    const { name, logo_url, banner_url, about, industry, location, website } = profileData;
    await pool.execute(
      'UPDATE companies SET name = ?, logo_url = ?, banner_url = ?, about = ?, industry = ?, location = ?, website = ? WHERE id = ?',
      [name, logo_url, banner_url, about, industry, location, website, id]
    );
  }

  static async approve(id) {
    await pool.execute('UPDATE companies SET approved = 1 WHERE id = ?', [id]);
  }
}

module.exports = Company;