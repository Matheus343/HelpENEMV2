const QuestoesModel = require('../models/QuestoesModel');

exports.create = (req, res) => {
  const { pergunta, resposta, nivel } = req.body;

  if (!pergunta || !resposta || !nivel) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
  }

  QuestoesModel.create({ pergunta, resposta, nivel }, (err, id) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao cadastrar a questão.' });
    }
    res.status(201).json({ message: 'Questão cadastrada com sucesso!', id });
  });
};

exports.getAll = (req, res) => {
  QuestoesModel.findAll((err, questoes) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar as questões.' });
    }
    res.status(200).json(questoes);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;

  QuestoesModel.findById(id, (err, questao) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar a questão.' });
    }

    if (!questao) {
      return res.status(404).json({ error: 'Questão não encontrada.' });
    }

    res.status(200).json(questao);
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { pergunta, resposta, nivel } = req.body;

  if (!pergunta || !resposta || !nivel) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
  }

  QuestoesModel.update(id, { pergunta, resposta, nivel }, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar a questão.' });
    }

    if (changes === 0) {
      return res.status(404).json({ error: 'Questão não encontrada.' });
    }

    res.status(200).json({ message: 'Questão atualizada com sucesso!' });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  QuestoesModel.delete(id, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao excluir a questão.' });
    }

    if (changes === 0) {
      return res.status(404).json({ error: 'Questão não encontrada.' });
    }

    res.status(200).json({ message: 'Questão excluída com sucesso!' });
  });
};
