const { getDb } = require('../firebase.js');

const getAllUsers = async (req, res) => {
    try {
        const { companyId } = req.params;
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        const querySnapshot = await db.collection('companies').doc(companyId).collection('users').get();
        const users = await Promise.all(querySnapshot.docs.map(async doc => {
            const userData = doc.data();
            return {
                userId: doc.id,
                ...userData,
            }
        }));
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
};



// Get user by Id
const getUserById = async (req, res) => {
    try {
        const { companyId, userId } = req.params;
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        const doc = await db.collection('companies').doc(companyId).collection('users').doc(userId).get();
        if (!doc.exists) {
            return res.status(400).send({
                "success": true,
                "error": {
                    "code": 400,
                    "message": "El usuario que buscas no existe",
                }
            });
        };
        const {user_type_id,...userData} = doc.data();
        const userTypeDoc = await db.collection('companies').doc(companyId).collection('user_type').doc(user_type_id).get();
        res.json({
            id: doc.id,
            userTypeInf: userTypeDoc.data() ?? {},
            ...userData,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Create a new user
const postCreateUser = async (req, res) => {
    try {
        const { companyId } = req.params;
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        const {userId, ...userData} = req.body;
        if(!userId){
            res.status(400).json({error: 'El id del usuario es requerido'});
        }
        const userRef = await db.collection('companies').doc(companyId).collection('users').doc(userId);
        const docSnapshot = await userRef.get();
        if (docSnapshot.exists) {
            return res.status(409).json({ error: 'El usuario ya existe' });
        }
        await userRef.set({ id: userId, ...userData });
        res.status(201).json({ id: userId, ...userData });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Update a user for id
const putUpdateUser = async (req, res) => {
    try {
        const { companyId, userId } = req.params;
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        const updatedUser = req.body;
        await db.collection('companies').doc(companyId).collection('users').doc(userId).set(updatedUser, { merge: true });
        res.json({ id: req.params.id, ...updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { companyId, userId } = req.params;
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        await db.collection('companies').doc(companyId).collection('users').doc(userId).delete();
        res.status(204).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    postCreateUser,
    putUpdateUser,
    deleteUser,
};