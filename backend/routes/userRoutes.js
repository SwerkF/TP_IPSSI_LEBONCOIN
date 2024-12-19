const { getUsers, getUser, registerUser, loginUser, editUser, deleteUser } = require('../controllers/userController');
const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getUsers);
router.get('/me', authMiddleware, getUser);
router.get('/:id', authMiddleware, getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/', authMiddleware, editUser);
router.delete('/', authMiddleware, deleteUser);

module.exports = router;


