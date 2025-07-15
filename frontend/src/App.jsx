import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import UploadForm from "./components/UploadForm";
import GovtSchemes from "./components/GovtSchemes"; // 👈 separate route

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <UploadForm />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
