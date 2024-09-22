const { getDb } = require('../firebase');

const getAllShiftType = async (req, res) =>{
    try{
        const {companyId} = req.params;
        const db = await getDb();
        if(!db){
            throw new Error('FireStore has not been initialized');
        }
        const querySnapshot = await db.collection('companies').doc(companyId).collection('shift_types').get();
        const shiftTypeData = await Promise.all(querySnapshot.docs.map(async (doc) =>{
            const shift =  doc.data();
            return {
                id: doc.id,
                ...shift
            }
        }));
        res.json(shiftTypeData);
    }catch(error){
        console.error('Error fetching shift type', error);
        res.status(500).send('Internal Server Error');
    }
};

const getShiftTypeById = async (res, req) =>{
    try{
        const {companyId, shiftTypeId} = req.params;
        const db =  await getDb();
        if(!db){
            throw new Error('FireStore has no been initialized');
        }
        const shiftTypeDoc = await db.collection('companies').doc(companyId).collection('shift_types').doc(shiftTypeId).get();
        if(!shiftTypeDoc.exists){
            return res.status(404).send('ShiftType no found');
        }
        res.json({id: shiftTypeDoc, ...shiftTypeDoc.data()});
    }catch(error){
        console.error('Error fetching shiftType', error);
        res.status(500).send('Internal server error');
    }
};

const postCreateShift = async( res, req)=>{
    try{
        const { companyId } = req.params;
        const db = await getDb();
        if(!db){
            throw new Error('FireStore has no been initialized');
        }
        const { startTime, endTime, ...rest } = req.body;
        const newShiftType = {
            ...rest,
            startTime: startTime ? Timestamp.fromDate(new Date(startTime)) : null,
            endTime: endTime ? Timestamp.fromDate(new Date(endTime)) : null,
        };
        const docRef =  await db.collection('companies').doc(companyId).collection('shift_types').add(newShiftType);
        res.status(201).json({id: docRef.id, ...newShiftType});
    }catch(error){
        console.error('Error creating shiftType', error);
        res.status(500).send('Internal server error');
    }
};

const deleteShiftType = async (res, req) =>{
    try{
        const {companyId, shiftTypeId}= req.params;
        const db = await getDb();
        if(!db){
            throw new Error('FireStore has no been initialized');
        }
        await db.collection('companies').doc(companyId).collection('shift_types').doc(shiftTypeId).delete();
        res.status(204).send();
    }catch(error){
        console.error('Error creating shiftType', error);
        res.status(500).send('Internal server error');
    }

};

const updateShiftType = async (res, req) =>{
    try{
        const { companyId } = req.params;
        const db = await getDb();
        if(!db){
            throw new Error('FireStore has no been initialized');
        }
        const { startTime, endTime, ...rest } = req.body;
        const newShiftType = {
            ...rest,
            startTime: startTime ? Timestamp.fromDate(new Date(startTime)) : null,
            endTime: endTime ? Timestamp.fromDate(new Date(endTime)) : null,
        };
        const docRef =  await db.collection('companies').doc(companyId).collection('shift_types').update(newShiftType);
        res.status(201).json({id: docRef.id, ...newShiftType});

    }catch(error){
        console.error('Error update shiftType', )
    }
}

module.exports = {
    getAllShiftType,
    getShiftTypeById,
    postCreateShift,
    deleteShiftType,
    updateShiftType
}