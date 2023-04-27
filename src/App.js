import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" exact element={<Home isLogin={isLogin} />} />
          <Route
            path="/login"
            exact
            element={<Login setIsLogin={setIsLogin} isLogin={isLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
