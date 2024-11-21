const express = require('express');
const bodyParser = require('body-parser');
const AlunoRouter = require('./routes/AlunoRouter');
const LivroRouter = require('./routes/LivroRouter');
const QuestoesRouter = require('./routes/QuestoesRouter');
const AdminRouter = require('./routes/AdminRouter');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/aluno', AlunoRouter);
app.use('/livros', LivroRouter);
app.use('/questoes', QuestoesRouter);
app.use('/admin', AdminRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
