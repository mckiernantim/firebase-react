import React, { useContext, useEffect, useState } from "react";
import "firebase/auth";
import { UserContext } from "../Providers/UserProvider";
import { Redirect } from "react-router-dom";
import { signInWithGoogle } from "../Services/Firebase";
export default function Login() {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);
  useEffect(() => {
    if (user) {
      console.log(user)
      setredirect("/LoggedInPage");
    }
  }, [user]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <div>
      <h1>Sign in with google!</h1>
      <button
        src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
        alt="google icon"
        onClick={signInWithGoogle}
      >
        <span> Continue with Google</span>
     
      </button>
    </div>
  );
}
