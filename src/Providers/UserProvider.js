//  this PROVIDER will be responsible for reutrning the
//  functionality of our  FIREBASE SERVICE.
import React, { useEffect, useState, createContext } from "react";
import { auth } from "../Services/Firebase";
// below we invoke createContext() to create a gobally available state
// this will distribute our user information when signed in
export const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // THIS IS A VERY POWERFUL FUNCTION
    // onAuthStateChanged will fire our callback funciton
    // if ANY change happens on the Firebase backend
    // regardless of a request from our app
    // when this function fires IT IS ALWAYS LISTENING 
    auth.onAuthStateChanged((user) => {
      
      if (user) {
        // if onAuthStateChanged emits a user - set it state
        const { email, displayName, photoURL, uid } = user;
        setUser({ email, displayName, photoURL, uid });
      } else { 
        setUser(null);
      }
    })
   // check for user save in state
  }, []);
  return (
    // UserContext.Provider is created automatically when useContext is invoked
    // we pass the stateful user value to our context and any of its children can
    // choose to access this value
   <UserContext.Provider value={user}>
    <div>
      { props.children }
    </div>
   </UserContext.Provider>
  );
};
