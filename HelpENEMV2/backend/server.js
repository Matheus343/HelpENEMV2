const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authenticateToken = require('./middleware/authenticateToken');

const AlunoRouter = require('./routes/AlunoRouter');
const LivroRouter = require('./routes/LivroRouter');
const QuestoesRouter = require('./routes/QuestoesRouter');
const AdminRouter = require('./routes/AdminRouter');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Rota protegida usando o middleware de autenticação
app.use('/alunos', authenticateToken, AlunoRouter);
app.use('/livros', authenticateToken, LivroRouter);
app.use('/questoes', authenticateToken, QuestoesRouter);

// Rota de administrador sem autenticação
app.use('/admin', AdminRouter);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
