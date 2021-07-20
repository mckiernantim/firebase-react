import logo from "./logo.svg";
import "./App.css";
import { LoginPage } from "./Pages/LoginPage";
import { LoggedInPage }from "./Pages/LoggedInPage"
import "firebase/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserProvider from "./Providers/UserProvider";

function App() {

  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
              <LoginPage />
            </Route>
            <Route path ="/loggedInPage">
              <LoggedInPage />
            </Route>
            <LoginPage />
          </Switch>
          </Router>
      </UserProvider>
    </div>
  );
}

export default App;
