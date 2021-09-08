import React, { useContext, useEffect } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useHistory } from "react-router-dom";


export const LoggedInPage = () => {
  let history = useHistory();
  
  const updateUser = () => {

    }

  useEffect(() => { });
  
  const handleLogout = async () => {
    alert("you've been logged out")
  };

  return (
    <div>
      <h1> YOU ARE NOW LOGGED IN</h1>
      <h1>Welcome !</h1>
      <h1> WE KNOW YOUR EMAIL : } !</h1>
      <div>
        <img
          className="user-image"
          alt="its the users head"
          src=
          ></img>
          <h1>WE KNOW WHAT YOU LOOK LIKE</h1>
      </div>

      <button onClick={handleLogout}> LOG OUT</button>
    </div>
  );
}
