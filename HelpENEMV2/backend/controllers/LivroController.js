const LivroModel = require('../models/LivroModel');

exports.create = (req, res) => {
  const { nomeLivro, autor, materia } = req.body;

  if (!nomeLivro || !autor || !materia) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
  }

  LivroModel.create({ nomeLivro, autor, materia }, (err, id) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao cadastrar o livro.' });
    }
    res.status(201).json({ message: 'Livro cadastrado com sucesso!', id });
  });
};

exports.getAll = (req, res) => {
  LivroModel.findAll((err, livros) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar os livros.' });
    }
    res.status(200).json(livros);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;

  LivroModel.findById(id, (err, livro) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar o livro.' });
    }

    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    res.status(200).json(livro);
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { nomeLivro, autor, materia } = req.body;

  if (!nomeLivro || !autor || !materia) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
  }

  LivroModel.update(id, { nomeLivro, autor, materia }, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar o livro.' });
    }

    if (changes === 0) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    res.status(200).json({ message: 'Livro atualizado com sucesso!' });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  LivroModel.delete(id, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao excluir o livro.' });
    }

    if (changes === 0) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    res.status(200).json({ message: 'Livro excluído com sucesso!' });
  });
};
