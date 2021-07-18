import React, { useState, useEffect, createContext } from "react";
import { auth } from "../Services/Firebase";
export const UserContext = createContext({user:null})

export default (props) => {
    const [user, setuser] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            console.log(user)
            if(user){
            const { displayName, email, photoURL } = user;
            setuser({
                displayName,
                email,
                photoURL
            })
        }
    })
    }, []) 
    return (
        <UserContext.Provider value={user}>
            <div>{props.children}</div>
        </UserContext.Provider>
    ) 
}

