const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/AlunoController');

router.get('/alunos', AlunoController.listarAlunos);

router.get('/alunos/:cpf', AlunoController.buscarPorCpf);

module.exports = router;

router.post('/register', AlunoController.register);

router.post('/login', AlunoController.login);

module.exports = router; 
