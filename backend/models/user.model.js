const pool = require('../config/db');

class User {
  static async create(userData) {
    const { name, email, password, role } = userData;
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async updateProfile(id, profileData) {
    const { name, profile_pic, resume_url, skills, bio } = profileData;
    await pool.execute(
      'UPDATE users SET name = ?, profile_pic = ?, resume_url = ?, skills = ?, bio = ? WHERE id = ?',
      [name, profile_pic, resume_url, skills, bio, id]
    );
  }
}

module.exports = User;