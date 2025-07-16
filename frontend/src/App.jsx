import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Predictor from "./pages/Predictor";
import Profile from "./pages/Profile";
import GovtSchemes from "./pages/GovtSchemes";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute"; // 👈 import

const App = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-all">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predictor" element={<Predictor />} />
        <Route path="/govt" element={<GovtSchemes />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile user={user} />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
