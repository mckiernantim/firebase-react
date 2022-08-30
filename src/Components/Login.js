
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";

import { signInWithGoogle, signOut } from "../Services/Firebase";


export const Login = () => {
  const user = useContext(UserContext)
 
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/loggedInPage");
    }
  }, [user, navigate]);

  return (
    <div>
      <section>
        <div>
          <button onClick={ signInWithGoogle } >Sign in With google</button>
          <button onClick= { signOut }> sign out</button>
      </div>
      </section>

    </div>
  );
};
