import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Home from "./pages/Home";
import Predictor from "./pages/Predictor";
import GovtSchemes from "./pages/GovtSchemes";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "../components/PrivateRoute"; // ✅ Match file name exactly

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-all">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predictor" element={<Predictor />} />
        <Route path="/govt" element={<GovtSchemes />} />
        <Route path="/login" element={<Login />} />

        {/* 👇 Protected Route */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
