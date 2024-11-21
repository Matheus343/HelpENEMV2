const AlunoModel = require('../models/AlunoModel');

exports.register = (req, res) => {
    const { nome, senha, cep, dataNascimento, cpf } = req.body;
  
    if (!nome || !senha || !cep || !dataNascimento || !cpf) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
    }
  
    AlunoModel.create({ nome, senha, cep, dataNascimento, cpf }, (err, id) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
      }
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id });
    });
  };
  
  
  exports.login = (req, res) => {
    const { cpf, senha } = req.body;
  
    if (!cpf || !senha) {
      return res.status(400).json({ error: 'CPF e senha são obrigatórios!' });
    }
  
    AlunoModel.findByCpf(cpf, (err, aluno) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao realizar login.' });
      }
  
      if (!aluno || aluno.senha !== senha) {
        return res.status(401).json({ error: 'CPF ou senha inválidos!' });
      }
  
      res.status(200).json({ message: 'Login realizado com sucesso!', aluno });
    });
  };
  

exports.getAll = (req, res) => {
  AlunoModel.findAll((err, alunos) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar alunos.' });
    }
    res.status(200).json(alunos);
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const aluno = req.body;

  if (!aluno.nome || !aluno.senha || !aluno.cep || !aluno.dataNascimento) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
  }

  AlunoModel.update(id, aluno, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar aluno.' });
    }

    if (changes === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    res.status(200).json({ message: 'Aluno atualizado com sucesso!' });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  AlunoModel.delete(id, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao excluir aluno.' });
    }

    if (changes === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    res.status(200).json({ message: 'Aluno excluído com sucesso!' });
  });
};
