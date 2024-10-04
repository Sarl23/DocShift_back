const {getDb} = require('../firebase.js');

const getAllShift = async (req, res) => {
    try{
        const {companyId} = req.params;
        const db =  await getDb();
        if(!db){
            throw new Error('FireStore has no been initialized');
        }
        const querySnapshot = await db.collection('companies').doc(companyId).collection('shift').get();
        const shiftData = await Promise.all(querySnapshot.docs.map(async (doc) =>{
            const shift = doc.data();
            return {
                id: doc.id,
                ...shift
            }
        }));
        res.json(shiftData);
    }catch(error){
        console.error('Error getting shift', error);
        res.status(500).send('Internal Server Error getting shift');
    }
};

const postCreateShift = async (req, res) => {
    try{
        const {companyId} = req.params;
        const db = await getDb();
        if(!db){
            throw new error('FireStore has no been initialized initialized');
        }
        const newShift = req.body;
        const newShiftRef = await db.collection('companies').doc(companyId).collection('shift').add(newShift);
        res.status(201).json({id: newShiftRef.id, ...newShift})
    }catch(error){
        console.error('Error creating shift', error);
        res.status(500).send('Internal server error creating shift')
    }
};

const getShiftById = async (req, res) =>{
    try{
        const {companyId, shiftId} = req.params;
        const db = await getDb();
        if(!db){
            throw new Error('FireStore has no been initialized');
        }
        const shiftDoc =  await db.collection('companies').doc(companyId).collection('shift').doc(shiftId).get();
        if(!shiftDoc.exists){
            return res.status(400).send({
                "success": true,
                "error": {
                    "code": 400,
                    "message": "Por el momento el turno que buscas no se encuentra",
                }
            });
        }
        res.json({id: shiftDoc.id, ...shiftDoc.data()})
    }catch(error){
        console.log('Error fetching shiftTye');
        res.status(500).send('Internal server error');
    }
};

const updateShiftById = async (req, res) =>{
    try{
        const {companyId, shiftId} = req.params;
        const db = await getDb();
        if(!db){
            throw new Error('FireStore has no been initialized');
        }
        const shiftData = req.body;
        const shiftRef = await db.collection('companies').doc(companyId).collection('shift').doc(shiftId).update(shiftData);
        res.status(201).json({id: shiftRef.id, ...shiftData});
    }catch(error){
        console.error('Error updating shift');
        res.status(500).send('Internal server error');
    }
};

const deleteShift =async (req, res)=>{
    try{
        const {companyId, shiftId}= req.params;
        const db = await getDb();
        if(!db){
            throw new Error('FireStore has no been initialized');
        }
        await db.collection('companies').doc(companyId).collection('shift').doc(shiftId).delete();
        res.status(204).send('Successfully deleted');
    }catch{
        console.error('Error deleting shift');
        res.status(500).send('Internal server error deleting shift');
    }
}

module.exports={
    getAllShift,
    postCreateShift,
    getShiftById,
    updateShiftById,
    deleteShift
}