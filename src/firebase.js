require('dotenv').config();
const axios = require('axios');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
let db;
async function initializeFirebase() {
    try {
        const serviceAccountUrl = process.env.GOOGLE_APPLICATION_CREDENTIALS;
        if (!serviceAccountUrl) {
            throw new Error('The GOOGLE_APPLICATION_CREDENTIALS environment variable is not set');
        }
        console.log('Downloading credentials');
        const response = await axios.get(serviceAccountUrl);
        const serviceAccount = response.data;
        initializeApp({
            credential: cert(serviceAccount)
        });
        db = getFirestore();
        console.log('Firebase initialized successfully...');
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        throw error;
    }
}

async function getDb() {
    if (!db) {
        await initializeFirebase();
    }
    return db;
}

module.exports = {
    getDb
};