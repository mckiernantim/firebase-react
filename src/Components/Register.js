import React, { useState } from "react";
import { register } from "../Services/Firebase";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      await register(email, password)
    } catch(err){
     alert(err)
    }
  }
  const onChange = (e) => {
    console.log(e.target)
    e.target.class === "email" ?
      setEmail(e.target.value) :
      setPassword(e.target.value)
    
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Register email
          <input
            type="text"
            value={email}
            onChange={onChange}
            id="email"
          ></input>
        </label>
        <label>
          Password
          <input
            type="text"
            value={password}
            onChange={onChange}
            id="password"
          ></input>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
