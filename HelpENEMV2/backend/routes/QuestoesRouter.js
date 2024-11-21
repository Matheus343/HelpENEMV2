const express = require('express');
const router = express.Router();
const QuestoesController = require('../controllers/QuestoesController');

router.post('/', QuestoesController.create);
router.get('/', QuestoesController.getAll);
router.get('/:id', QuestoesController.getById);
router.put('/:id', QuestoesController.update);
router.delete('/:id', QuestoesController.delete);

module.exports = router;
