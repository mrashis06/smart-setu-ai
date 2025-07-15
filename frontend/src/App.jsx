import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import UploadForm from "./components/UploadForm";
import GovtSchemes from "./components/GovtSchemes";
import UploadPage from "./components/UploadForms"; // or ./pages/UploadPage
import Login from "./components/Login";

function Home() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schemes" element={<GovtSchemes />} />
          <Route path="/predictor" element={<UploadPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
