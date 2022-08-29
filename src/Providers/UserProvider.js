//  this PROVIDER will be responsible for reutrning the
//  functionality of our  FIREBASE SERVICE.
import React, { useEffect, useState } from "react";
import { auth } from "../Services/Firebase"


export const UserProvider = (props) => {
  const [user, setUser] = useState("its tim!");

  useEffect(() => {
   // check for user save in state
  }, []);
  return (
   <></>
  );
};
