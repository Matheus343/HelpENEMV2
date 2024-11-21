const express = require('express');
const bodyParser = require('body-parser');
const AlunoRouter = require('./routes/AlunoRouter');
const LivroRouter = require('./routes/LivroRouter');
const QuestoesRouter = require('./routes/QuestoesRouter');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/aluno', AlunoRouter);
app.use('/livro', LivroRouter);
app.use('/questoes', QuestoesRouter);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
