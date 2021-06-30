import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqGMbRtVEtCLVOaA1HLN_quJhEyRLMl4Q",
    authDomain: "whats-the-plan-yall.firebaseapp.com",
    projectId: "whats-the-plan-yall",
    storageBucket: "whats-the-plan-yall.appspot.com",
    messagingSenderId: "572126419432",
    appId: "1:572126419432:web:6376f6ef28caf4493f2c5d",
    measurementId: "G-280E5QF97S"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, provider, storage };
  // export default db;