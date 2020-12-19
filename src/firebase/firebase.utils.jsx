import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyD1Z9wnKNuM4XEWZZOqELJPV9g8J5HEaoI",
    authDomain: "crwn-db-19f96.firebaseapp.com",
    projectId: "crwn-db-19f96",
    storageBucket: "crwn-db-19f96.appspot.com",
    messagingSenderId: "622364481339",
    appId: "1:622364481339:web:a73cec77eb308cb538091e",
    measurementId: "G-5FHCT10ZYD"
  }

  export const creatUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        })

      }
      catch(error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;


  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();


  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase; 
