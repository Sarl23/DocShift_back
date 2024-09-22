const express = require('express');
const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes');
const userTypeRoutes = require('./userTypeRoutes');
const shiftTypeRoutes = require('./shiftTypeRoutes');

const router = express.Router();

router.use(userRoutes);
router.use(companyRoutes);
router.use(userTypeRoutes);
router.use(shiftTypeRoutes);

module.exports = router;