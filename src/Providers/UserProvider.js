import React, { useState, useEffect, createContext } from "react";
import { auth } from "../Services/Firebase";
export const UserContext = createContext({user:null})

export default (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            console.log("changing state of user")
            console.log(user)
            if(user){
            const { displayName, email, photoURL } = user;
            setUser({
                displayName,
                email,
                photoURL
            })
            }else{
                setUser(null)
        }
    })
    }, []) 
    return (
        <UserContext.Provider value={user}>
            <div>{props.children}</div>
        </UserContext.Provider>
    ) 
}

