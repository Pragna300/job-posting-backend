const express = require('express');
const { getCompanies, getRevenue, approveCompany } = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.get('/companies', getCompanies);
router.get('/revenue', getRevenue);
router.put('/companies/:id/approve', approveCompany);

module.exports = router;