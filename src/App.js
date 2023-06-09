import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { loadApiUsers } from "./api/ApiRoutes";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    loadApiUsers();
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
