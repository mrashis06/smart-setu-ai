import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar"; // adjust path if needed
import Home from "./pages/Home";
import Predictor from "./pages/Predictor";
import GovtSchemes from "./pages/GovtSchemes";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute"; // 👈 if using one

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-all">
      <Navbar />

      {/* All Routes Rendered Here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predictor" element={<Predictor />} />
        <Route path="/govt" element={<GovtSchemes />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Profile Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
