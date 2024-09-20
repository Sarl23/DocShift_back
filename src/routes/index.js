const express = require('express');
const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes');

const router = express.Router();

router.use(userRoutes);
router.use(companyRoutes);

module.exports = router;