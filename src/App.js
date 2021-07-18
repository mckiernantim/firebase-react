import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import LoggedInPage from "./Pages/LoggedInPage"
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { firebaseConfig } from "./.config.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserProvider from "./Providers/UserProvider";
function App() {
  console.log(firebaseConfig);
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route path ="/loggedInPage">
              
              <LoggedInPage />
            </Route>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <LoginPage />
          </Switch>
          </Router>
      </UserProvider>
    </div>
  );
}

export default App;
