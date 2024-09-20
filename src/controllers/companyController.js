const { getDb } = require('../firebase.js');

// Get all de companies
const getAllCompanies = async (req, res) => {
    try {
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not bee initialized');
        }
        const querySnapshot = await db.collection('companies').get();
        const companies = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.json(companies);
    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(500).send('Internal Server Error');
    }
};

//Get company by id
const getCompanyById = async (req, res) => {
    try {
        const db = await getDb();
        if (!db) {
            throw new error('Firestore has not bee initialized');
        }
        const doc = await db.collection('companies').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).send('Company not found');
        }
        const company = doc.data();
        res.json({
            id: company.id,
            ...company
        });

    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(500).send('Internal Server Error');
    }
};

//Create company
const postCreateCompany = async (req, res) => {
    console.log('Company created');
    try {
        const db = await getDb();
        if (!db) {
            throw new error('Firestore has not bee initialized');
        }
        const newCompany = req.body;
        console.log('Company created', newCompany);
        const docRef = await db.collection('companies').add(newCompany);
        res.status(201).json({ id: docRef.id, ...newCompany });
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).send('Internal Server Error');
    }
};

//Delete company
const deleteCompany = async (req, res) => {
    try {
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        await db.collection('companies').doc(req.params.id).delete();
        res.status(204).send('Company deleted successfully');
    } catch (error) {
        console.error('Error deleting company:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Update Company
const putCompanyById = async (req, res) => {
    try {
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not bee initialized');
        }
        const updatedCompany = req.body;
        await db.collection('companies').doc(req.params.id).set(updatedCompany, { merge: true });
        res.json({ id: req.params.id, ...updatedCompany });
    } catch (error) {
        console.error('Error updating company:', error);
        res.status(500).send('Internal server Error');
    }

};

module.exports = {
    getAllCompanies,
    getCompanyById,
    deleteCompany,
    postCreateCompany,
    putCompanyById,
}