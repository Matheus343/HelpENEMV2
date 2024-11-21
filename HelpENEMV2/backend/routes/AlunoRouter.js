const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/AlunoController');

router.post('/register', AlunoController.register);
router.post('/login', AlunoController.login);

module.exports = router; // Certifique-se de que está exportando o router
