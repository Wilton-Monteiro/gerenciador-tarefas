const pool = require('../db');

exports.getTarefas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tarefas ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar tarefas');
  }
};

exports.criarTarefa = async (req, res) => {
  const { descricao } = req.body;
  try {
    await pool.query('INSERT INTO tarefas (descricao) VALUES ($1)', [descricao]);
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar tarefa');
  }
};

exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;
  try {
    await pool.query('UPDATE tarefas SET descricao = $1 WHERE id = $2', [descricao, id]);
    res.send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao editar tarefa');
  }
};

exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tarefas WHERE id = $1', [id]);
    res.send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao excluir tarefa');
  }
};
