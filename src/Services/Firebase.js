import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
  };

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

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

