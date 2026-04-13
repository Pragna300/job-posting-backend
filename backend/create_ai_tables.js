const pool = require('./config/db');

async function createAITables() {
  console.log('Building Secure AI Infrastructure Tables...');
  
  const query = `
    CREATE TABLE IF NOT EXISTS interview_links (
      id SERIAL PRIMARY KEY,
      token UUID UNIQUE NOT NULL,
      user_id INT NOT NULL REFERENCES users(id),
      application_id INT NOT NULL REFERENCES applications(id),
      is_used BOOLEAN DEFAULT false,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS interview_results (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(id),
      application_id INT NOT NULL REFERENCES applications(id),
      score INT,
      feedback JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('✅ Success! The interview_links and interview_results tables are now perfectly deployed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration Failed:', error.message);
    process.exit(1);
  }
}

createAITables();
