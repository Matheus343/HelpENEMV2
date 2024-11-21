const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const AlunoRouter = require('./routes/AlunoRouter');
const LivroRouter = require('./routes/LivroRouter');
const QuestoesRouter = require('./routes/QuestoesRouter');
const AdminRouter = require('./routes/AdminRouter');

const app = express();
const PORT = 3000;

// Configuração do banco de dados SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Rotas existentes
app.use('/aluno', AlunoRouter);
app.use('/livros', LivroRouter);
app.use('/questoes', QuestoesRouter);
app.use('/admin', AdminRouter);
app.use('/uploads', express.static('uploads'));

// Rota para buscar todos os alunos
app.get('/alunos', (req, res) => {
  const query = 'SELECT * FROM alunos';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar alunos:', err);
      res.status(500).json({ error: 'Erro ao buscar alunos' });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Rota para buscar aluno por CPF
app.get('/alunos/:cpf', (req, res) => {
  const query = 'SELECT * FROM alunos WHERE cpf = ?';
  const cpf = req.params.cpf;

  db.get(query, [cpf], (err, row) => {
    if (err) {
      console.error('Erro ao buscar aluno por CPF:', err);
      res.status(500).json({ error: 'Erro ao buscar aluno por CPF' });
    } else if (!row) {
      res.status(404).json({ error: 'Aluno não encontrado' });
    } else {
      res.status(200).json(row);
    }
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
