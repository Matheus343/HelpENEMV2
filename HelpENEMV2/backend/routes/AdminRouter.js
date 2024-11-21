const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController.js');
const jwt = require('jsonwebtoken');
const secret = 'chave-secreta'; 

exports.loginAdmin = (req, res) => {
  const { ra, senha } = req.body;

  if (ra === '082210042' && senha === 'Admin@123') {
    const token = jwt.sign({ ra }, secret, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login realizado com sucesso!', token });
  } else {
    return res.status(401).json({ error: 'Credenciais inválidas!' });
  }
};

router.post('/login', AdminController.loginAdmin);

module.exports = router;
