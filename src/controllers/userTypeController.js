const { getDb } = require('../firebase.js');

const createUserType = async (req, res) => {
    try {
        const { companyId } = req.params;
        const { name, description } = req.body;
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        const newUserType = {
            name,
            description
        };
        const userTypeRef = await db.collection('companies').doc(companyId).collection('user_type').add(newUserType);
        res.json({ id: userTypeRef.id, ...newUserType });
    } catch (error) {
        console.error('Error creating user_type:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getUserTypes = async (req, res) => {
    try {
        const { companyId } = req.params;
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        const querySnapshot = await db.collection('companies').doc(companyId).collection('user_type').get();
        const userTypes = await Promise.all(querySnapshot.docs.map(async doc => {
            const userTypeData = doc.data();
            return {
                id: doc.id,
                ...userTypeData,
            }
        }));
        res.json(userTypes);
    } catch (error) {
        console.error('Error fetching user_types:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getUserTypeById = async (req, res) => {
    try {
        const { companyId, userTypeId } = req.params;
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        const userTypeDoc = await db.collection('companies').doc(companyId).collection('user_type').doc(userTypeId).get();
        if (!userTypeDoc.exists) {
            return res.status(404).send('User type not found');
        }
        res.json({ id: userTypeDoc.id, ...userTypeDoc.data() });
    } catch (error) {
        console.error('Error fetching user_type:', error);
        res.status(500).send('Internal Server Error');
    }
};


const updateUserType = async (req, res) => {
    try {
        const { companyId, userTypeId } = req.params;
        const { name, description } = req.body;
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        const updatedUserType = {
            name,
            description
        };
        await db.collection('companies').doc(companyId).collection('user_type').doc(userTypeId).update(updatedUserType);
        res.json({ id: userTypeId, ...updatedUserType });
    } catch (error) {
        console.error('Error updating user_type:', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteUserType = async (req, res) => {
    try {
        const { companyId, userTypeId } = req.params;
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        await db.collection('companies').doc(companyId).collection('user_type').doc(userTypeId).delete();
        res.status(204).send(); // No Content
    } catch (error) {
        console.error('Error deleting user_type:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    createUserType,
    getUserTypeById,
    getUserTypes,
    updateUserType,
    deleteUserType
}