import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth();

auth.useDeviceLanguage();


const googleAuth = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    try {
  //the signInWithPopUp() method accepts ANY provider we create. This is all our authentication logic
    signInWithPopup(auth, googleAuth).then((res) => {
        console.log(res)
    });
     } catch (err) {
      console.log(err);
    }
  };

  export const logOut = async () =>{
    try {
      await signOut(auth)
      alert("you've signed out - congrats.")
    } catch(err) {
      console.log(err)
    }
  }
