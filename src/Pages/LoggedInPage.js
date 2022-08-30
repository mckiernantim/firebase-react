import React, { useContext, useEffect } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useNavigate} from "react-router-dom";
import { signOut } from "../Services/Firebase";



export const LoggedInPage = () => {
  const imgStyle = {
      width:'30vh',
      height:'30vh'
  }
  const navigate = useNavigate();
  const user = useContext(UserContext);
  
  useEffect(() => { 
    
    if(!user) {
        alert("not logged in - redirecting")
        navigate("/");
      }
    }, [user, navigate]);

  
  const handleLogout = async () => {
        alert("you've been logged out")
        signOut();
  };
  if ( user ){
    return (
      <div>
        <h1> YOU ARE NOW LOGGED IN : </h1>
        <h1>Welcome {user.displayName} !</h1>
        <h1>WE KNOW WHAT YOU LOOK LIKE!</h1> 
        <h1>this is your uid { user.uid }</h1>
        <div>
          <img src = {user.photoURL}
          style={imgStyle}
            className="user-image"
            alt="its the users head"
            referrerpolicy="no-referrer"
            ></img>
        </div>
        <h2> email: {user.email} </h2>
        <button onClick={handleLogout}> LOG OUT</button>

      </div>
    );
  } else 
  return (
    <div> NOT LOGGED IN </div>
  )
}
