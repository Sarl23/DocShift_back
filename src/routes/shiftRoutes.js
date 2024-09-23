const { Router } = require('express');
const {
    getAllShift,
    postCreateShift,
    getShiftById,
    updateShiftById,
    deleteShift
} = require('../controllers/shiftController.js');

const router = Router();

router.get('/companies/:companyId/shift', getAllShift);
router.get('/companies/:companyId/shift/:shiftId', getShiftById);
router.post('/companies/:companyId/shift', postCreateShift);
router.put('/companies/:companyId/shift/:shiftId', updateShiftById);
router.delete('/companies/:companyId/shift/:shiftId', deleteShift);

module.exports = router;