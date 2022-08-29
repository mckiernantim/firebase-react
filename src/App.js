import "./App.css";
import { LoginPage } from "./Pages/LoginPage";
import { LoggedInPage } from "./Pages/LoggedInPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Providers/UserProvider";

const whaterer = () => {
  try {
    console.log("awdhakwjdh");
  } catch (err) {
    throw err;
  }
};
function App() {
  return (
    <div className="App">
  
        <header className="App-header">LETS LEARN FIREBASE AUTH</header>

        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/loggedInPage" element={<LoggedInPage />} />
          </Routes>
        </Router>
  
    </div>
  );
}

export default App;
