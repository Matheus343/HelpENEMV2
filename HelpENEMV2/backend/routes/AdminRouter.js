const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController.js');

router.post('/loginAdmin', AdminController.loginAdmin);

module.exports = router;
