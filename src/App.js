
import "./App.css";
import { LoginPage } from "./Pages/LoginPage";
import { LoggedInPage }from "./Pages/LoggedInPage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserProvider from "./Providers/UserProvider";

function App() {

  return (
    <div className="App">
     
        <Router>
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route path ="/loggedInPage">
              <LoggedInPage />
            </Route>
          </Switch>
        </Router>
 
    </div>
  );
}

export default App;
