
import React, { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";




export const Login = () => {
 
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/loggedInPage");
    }
  }, [user, navigate]);

  return (
    <div>
      <section>
        <div>
          <button >Sign in With google</button>
          <button> sign out</button>
      </div>
      </section>

    </div>
  );
};
