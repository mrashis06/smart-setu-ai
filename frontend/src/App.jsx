import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Predictor from "./pages/Predictor";
import Profile from "./pages/Profile";
import GovtSchemes from "./pages/GovtSchemes";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-all">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predictor" element={<Predictor />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schemes" element={<GovtSchemes />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
