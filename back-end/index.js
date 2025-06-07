const express = require('express');
const cors = require('cors');
const path = require('path');
const tarefasController = require('./controllers/tarefasController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, 'front-end')));

// Rotas da API
app.get('/tarefas', tarefasController.getTarefas);
app.post('/tarefas', tarefasController.criarTarefa);
app.put('/tarefas/:id', tarefasController.editarTarefa);
app.delete('/tarefas/:id', tarefasController.excluirTarefa);

// Rota para servir o HTML principal - deve vir após as rotas da API
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end', 'index.html'));
});

// Rota catch-all para SPAs (opcional, mas boa prática)
app.get('*', (req, res) => {
  // Se não for uma rota da API, serve o index.html
  if (!req.path.startsWith('/tarefas')) {
    res.sendFile(path.join(__dirname, 'front-end', 'index.html'));
  } else {
    res.status(404).json({ erro: 'Rota não encontrada' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
});