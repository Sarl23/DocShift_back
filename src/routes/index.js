const express = require('express');
const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes');
const userTypeRoutes = require('./userTypeRoutes');

const router = express.Router();

router.use(userRoutes);
router.use(companyRoutes);
router.use(userTypeRoutes);

module.exports = router;