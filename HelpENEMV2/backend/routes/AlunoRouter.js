const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/AlunoController');

router.post('/register', AlunoController.register);

router.post('/login', AlunoController.login);

module.exports = router; 
