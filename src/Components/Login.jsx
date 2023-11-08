
import { useContext, useEffect } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logOut } from "../Services/Firebase";



export const Login = () => {
  const user = useContext(UserContext);
  const navigate  = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/loggedInPage");
    }
  }, [user, navigate]);

  return (
    <div>
      <section>
        <div>
          <button onClick={ signInWithGoogle }>Sign in With google</button>
          <button onClick={ logOut }> log out</button>
      </div>
      </section>

    </div>
  );
};
