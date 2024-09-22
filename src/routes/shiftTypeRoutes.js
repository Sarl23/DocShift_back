const { Router } = require('express');
const {
    getAllShiftType,
    getShiftTypeById,
    postCreateShift,
    deleteShiftType,
    updateShiftType
} = require('../controllers/shiftTypeController.js');

const router = Router();

router.get('/companies/:companyId/shift_type', getAllShiftType);
router.get('/companies/:companyId/shift_types/:shiftTypeId', getShiftTypeById);
router.post('/companies/:companyId/shift_type', postCreateShift);
router.put('/companies/:companyId/shift_types/:shiftTypeId', updateShiftType);
router.delete('/companies/:companyId/shift_types/:shiftTypeId', deleteShiftType);

module.exports = router;