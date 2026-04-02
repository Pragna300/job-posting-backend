const express = require('express');
const { getProfile, updateProfile } = require('../controllers/company.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['manager']));

router.get('/profile', getProfile);
router.put('/profile', upload.single('logo'), updateProfile);

module.exports = router;