import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useHistory } from "react-router-dom";
import { logOut } from "../Services/Firebase";

export const LoggedInPage = () => {
  let history = useHistory();
  const user = useContext(UserContext);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  
  const updateUser = () => {
    let { displayName, email, photoURL } = user;
      setDisplayName(displayName)
      setEmail(email);
      setPhotoURL(photoURL)
    }
  useEffect(() => {
    if (!user) {
      history.push("/");
    } else {
      updateUser()
    } 
  }, [user]);
  
  const handleLogout = async () => {
    logOut();
    alert("you've been logged out")
  };

  return (
    <div>
      <h1> YOU ARE NOW LOGGED IN</h1>
      <h1>Welcome {displayName}!</h1>
      <h1> WE KNOW YOUR EMAIL : {email} !</h1>
      <div>
        <img
          className="user-image"
          alt="its the users head"
          src={photoURL}
          ></img>
          <h1>WE KNOW WHAT YOU LOOK LIKE</h1>
      </div>

      <button onClick={handleLogout}> LOG OUT</button>
    </div>
  );
}
