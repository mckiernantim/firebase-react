import "./App.css";
import { LoginPage } from "./Pages/LoginPage";
import { UserProvider } from "./Providers/UserProvider";
import { LoggedInPage } from "./Pages/LoggedInPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
;
  return (
    <div className="App">
     <header className="App-header">LETS LEARN FIREBASE AUTH</header>
      <UserProvider>
        <Router>
          <Routes>
            <Route  path="/" element = { <LoginPage /> } /> 
            <Route path="/loggedInPage" element = { <LoggedInPage } />
         </Routes>
        </Router>

      </UserProvider>

    </div>
  );
}

export default App;
