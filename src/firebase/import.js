// Imports
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./firebase.config');
const serviceAccount = require('./serviceAccount.json');

// JSON To Firestore
const jsonToFirestore = async () => {
    try {
        console.log('Initialzing Firebase');
        await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
        console.log('Firebase Initialized');

        await firestoreService.restore('./position.json');
        console.log('Upload Success');
    }
    catch (error) {
        console.log(error);
    }
};

jsonToFirestore();