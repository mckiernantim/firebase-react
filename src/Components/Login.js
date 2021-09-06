import React, { useContext, useEffect} from "react";


export const Login = () => {

  const history = useHistory()
 
  useEffect(() => {})

  const handleSignIn = async () =>{}
 return (
    <div>
      <h1>Sign in with google!</h1>
      <button
        src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
        alt="google icon"
        
      >
        <span> Continue with Google</span>
    </button>
    </div>
  );
}
