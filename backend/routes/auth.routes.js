const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

const { getNotifications, deleteNotification } = require('../controllers/notification.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);
router.get('/notifications', authMiddleware, getNotifications);
router.delete('/notifications/:id', authMiddleware, deleteNotification);

module.exports = router;
