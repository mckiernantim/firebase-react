import React, { useContext, useEffect } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useHistory } from "react-router-dom";
import { signInWithGoogle, signOut } from "../Services/Firebase";



export const Login = () => {
  const user = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (user) {
      history.push("/loggedInPage");
    }
  }, [user, history]);

  return (
    <div>
      <section>
        <div>
          <div> login works</div>
          <button onClick={signInWithGoogle}>Sign in With google</button>
          <button onClick={signOut}> sign out</button>
      </div>
      </section>
    </div>
  );
};
