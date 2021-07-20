import React, { useContext, useEffect} from "react";
import { UserContext } from "../Providers/UserProvider";
import { useHistory } from "react-router-dom";
import { signInWithGoogle } from "../Services/Firebase";

export const Login = () => {

  const history = useHistory()
  const user = useContext(UserContext);
 
  useEffect(() => {
    if(user){
      history.push("/LoggedInPage")
    }
  }, [user])

  const handleSignIn = async () =>{
    try {
      await signInWithGoogle() 
    } catch(err) {
      console.log(err)
    }
  }
 return (
    <div>
      <h1>Sign in with google!</h1>
      <button
        src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
        alt="google icon"
        onClick={handleSignIn}
      >
        <span> Continue with Google</span>
    </button>
    </div>
  );
}
