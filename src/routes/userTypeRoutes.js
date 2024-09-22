const { Router } = require('express');
const {
    createUserType,
    getUserTypeById,
    getUserTypes,
    updateUserType,
    deleteUserType
} = require('../controllers/userTypeController.js')

const router = Router();

router.get('/companies/:companyId/user_type', getUserTypes);
router.get('/companies/:companyId/user_types/:userTypeId', getUserTypeById);
router.post('/companies/:companyId/user_types', createUserType);
router.put('/companies/:companyId/user_types/:userTypeId', updateUserType);
router.delete('/companies/:companyId/user_types/:userTypeId', deleteUserType);

module.exports = router;