const { getAnnonces, getAnnonce, createAnnonce, editAnnonce, deleteAnnonce } = require('../controllers/annonceController');
const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAnnonces);
router.get('/:id', getAnnonce);
router.post('/', authMiddleware, createAnnonce);
router.patch('/:id', authMiddleware, editAnnonce);
router.delete('/:id', authMiddleware, deleteAnnonce);

module.exports = router;