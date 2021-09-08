import React, { useState, useEffect, createContext } from "react";

const dummyUser = {
  displayName: "Nic Cage",
  email: " Nic@Cage.NicCage",
  uid: "incomprehensible string",
  photoURL:
    "https://pyxis.nymag.com/v1/imgs/bef/c87/6359a2a35db664d45ac31794d122d4c8a7-15-nic-cage.rsocial.w1200.jpg",
};
export const UserProvider =  (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {}, []) 
    return (
      <div> </div>
    ) 
}

