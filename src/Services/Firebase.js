
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Below is the config object from firebase - this will be given to you when you create a project
// You do not need to place these in a .env due to firebase's setup but I would anyway
const firebaseConfig = {
    // apikey:process.env.REACT_APP_API_KEY
  apiKey: "AIzaSyAXIj_DuDvxZtU3FFXP5oMRisZAzVWge6E",
  authDomain: "fir-8-4.firebaseapp.com",
  projectId: "fir-8-4",
  storageBucket: "fir-8-4.appspot.com",
  messagingSenderId: "259291437863",
  appId: "1:259291437863:web:0457011eaba74f04ea6702",
  measurementId: "G-ZK4G4WD61S"
};

// Initialize Firebase with the config object we were given
const app = initializeApp(firebaseConfig);
// in the event we wish to leverage analytics we can use bellow
const analytics = getAnalytics(app);
// Here we create an instance of auth - connected to our Firebase App (firabse handles this under the hood)
export const auth = getAuth();
// configure our auth instance to use the default language of the device we are using
auth.useDeviceLanguage();
// Create an instance of the GoogleAuthProvider class 
// Each Oauth provider has their own instance that must be used to sign in

const googleProvider = new GoogleAuthProvider();
// Below is our login logic for our components
export const signInWithGoogle = () => {
    try {
        // invoke the signInWithPopup method from firebase with our auth, and googleProvider
        signInWithPopup(auth, googleProvider).then((res)=> {
            // note: signInWithPopup will change the state of our auth object 
            // we do not need to return anythting from this function;
            const user = res.user;
            console.log(user)
        })
    } catch (err) {
        console.log(err)
    }
}
// Export a logout function to be used in components
export const signOut = async () => {
    try {
        await auth.signOut();
        alert("hey youre signed out")
    } catch(err) {
        console.log(err)
    }
}
