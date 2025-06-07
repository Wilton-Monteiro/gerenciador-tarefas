-- Script de inicialização do banco de dados
CREATE TABLE IF NOT EXISTS tarefas (
  id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados de exemplo (opcional)
INSERT INTO tarefas (descricao) VALUES 
  ('Exemplo de tarefa 1'),
  ('Exemplo de tarefa 2')
ON CONFLICT DO NOTHING;