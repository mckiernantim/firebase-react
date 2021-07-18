import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Providers/UserProvider";
import { logOut } from "../Services/Firebase";
import Login from "../Components/Login";
export default function LoggedInPage() {
  const userData = useContext(UserContext);
  const [user, updateUser] = useState({ userData });

  useEffect(() => {
    console.log("using use effect");
    if (userData) {
      updateUser(userData);
      console.log(user);
    }
  }, [userData, user]);

  return (
    <div>
      <h1> YOU ARE NOW LOGGED IN</h1>
      <h1>{user.displayName}</h1>
      <h1>{user.email}</h1>
      <div class="user-image">
        <img src={user.photoURL} />
      </div>
      <button onClick={logOut}> LOG OUT</button>
    </div>
  );
}
