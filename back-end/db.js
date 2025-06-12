const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'tarefas_db',
  password: 'postgres123',
  port: process.env.DB_PORT || 5432, // CORRIGIDO: 5432 dentro do container
});

// Inicializar a tabela
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tarefas (
        id SERIAL PRIMARY KEY,
        descricao TEXT NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Tabela de tarefas criada/verificada com sucesso');
  } catch (err) {
    console.error('Erro ao criar tabela:', err);
  }
}

initDB();

module.exports = pool;