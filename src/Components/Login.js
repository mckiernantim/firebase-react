import React, { useContext, useEffect, useState } from "react";
import { LoggedInPage } from "../Pages/LoggedInPage";
import { UserContext } from "../Providers/UserProvider";
import { useHistory } from "react-router-dom";

import {
  signInWithEmail,
  signInWithGoogle,
  signOut,
  register,
} from "../Services/Firebase";

import Register from "./Register";

export const Login = () => {
  const user = useContext(UserContext);
  console.log(UserContext)
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
    } catch (err) {
      alert(err);
    }
  };
  const onChange = (e) => {
    console.log(e.target);
    e.target.class === "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  };
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
