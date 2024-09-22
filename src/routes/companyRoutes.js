const { Router } = require('express');
const {
    getAllCompanies,
    getCompanyById,
    postCreateCompany,
    putCompanyById,
    deleteCompany
} = require('../controllers/companyController.js');

const router = Router();

router.get('/companies', getAllCompanies);
router.get('/company/:id', getCompanyById);
router.delete('/company/:id', deleteCompany);
router.post('/company', postCreateCompany);
router.put('/company/:id', putCompanyById);

module.exports = router;