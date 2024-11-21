const LivroModel = require('../models/LivroModel');

exports.create = (req, res) => {
  const livro = req.body;

  if (!livro.nomeLivro || !livro.autor || !livro.materia) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
  }

  LivroModel.create(livro, (err, id) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao cadastrar livro.' });
    }
    res.status(201).json({ message: 'Livro cadastrado com sucesso!', id });
  });
};

exports.getAll = (req, res) => {
  LivroModel.findAll((err, livros) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar livros.' });
    }
    res.status(200).json(livros);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;

  LivroModel.findById(id, (err, livro) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar livro.' });
    }

    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    res.status(200).json(livro);
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const livro = req.body;

  if (!livro.nomeLivro || !livro.autor || !livro.materia) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
  }

  LivroModel.update(id, livro, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar livro.' });
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
      return res.status(500).json({ error: 'Erro ao excluir livro.' });
    }

    if (changes === 0) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    res.status(200).json({ message: 'Livro excluído com sucesso!' });
  });
};
