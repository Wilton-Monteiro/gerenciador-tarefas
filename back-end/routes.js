const express = require('express');
const router = express.Router();
const db = require('./db');


router.get('/tarefas', async (req, res) => {
  try {
    const resultado = await db.query('SELECT * FROM tarefas');
    res.json(resultado.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
