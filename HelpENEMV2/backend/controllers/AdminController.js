const AdminModel = require('../models/AdminModel.js');

exports.loginAdmin = (req, res) => {
  const { ra, senha } = req.body;

  if (!ra || !senha) {
    return res.status(400).json({ error: 'RA e senha são obrigatórios!' });
  }

  AdminModel.findByRa(ra, (err, admin) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao realizar login.' });
    }

    if (!admin || admin.senha !== senha) {
      return res.status(401).json({ error: 'RA ou senha inválidos!' });
    }

    res.status(200).json({ message: 'Login realizado com sucesso!', admin });
  });
};
