import "./App.css";
import { LoginPage } from "./Pages/LoginPage";
import { UserProvider } from "./Providers/UserProvider";
import { LoggedInPage } from "./Pages/LoggedInPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
;
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <header className="App-header">LETS LEARN FIREBASE AUTH</header>
              <LoginPage />
            </Route>
            <Route path="/loggedInPage">
              <LoggedInPage />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
