require('dotenv').config();

const {initializeApp, applicationDefault, cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');
const serviceAccount = require('/Users/sergiorojas/Documents/web-projects/node-firebase/src/firebase.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = {
    db,
}