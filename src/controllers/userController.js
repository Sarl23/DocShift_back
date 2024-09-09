const { getDb } = require('../firebase.js');

const getAllUsers = async (req, res) => {
    try {
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        const querySnapshot = await db.collection('users').get();
        const users = querySnapshot.docs.map(doc => doc.data());
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
};



// Get user by Id
const getUserById = async (req, res) => {
    try {
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        const doc = await db.collection('users').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).send('User not found');
        }

        const userData = doc.data();
        const userTypeDoc = await userData.userType.get();
        if(!userTypeDoc.exists){
            return res.status(404).send('User type not found');
        }
        const hospitalData = await userData.hospital.get();
        if(!hospitalData.exists){
            return res.status(404).send('Hospital type not found');
        }

        const { userType, hospital,...userWithoutRefKey } = userData;
        res.json({ 
            id: doc.id, 
            ...userWithoutRefKey,
            userTypeId: userTypeDoc.id,
            hospitalId: hospitalData.id,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Create a new user
const postCreateUser= async (req, res) => {
    try {
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        const newUser = req.body;
        const docRef = await db.collection('users').add(newUser);
        res.status(201).json({ id: docRef.id, ...newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Update a user for id
const putUpdateUser= async (req, res) => {
    try {
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        const updatedUser = req.body;
        await db.collection('users').doc(req.params.id).set(updatedUser, { merge: true });
        res.json({ id: req.params.id, ...updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const db = await getDb();
        if (!db) {
            throw new Error('Firestore has not been initialized');
        }
        await db.collection('users').doc(req.params.id).delete();
        res.status(204).send();
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