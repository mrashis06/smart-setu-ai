import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Predictor from "./pages/Predictor";
import Profile from "./pages/Profile";
import GovtSchemes from "./pages/GovtSchemes";

const App = () => {
  const [route, setRoute] = useState("home");

  const renderPage = () => {
    switch (route) {
      case "predictor":
        return <Predictor />;
      case "profile":
        return <Profile />;
      case "govt":
        return <GovtSchemes />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-all">
      <Navbar setRoute={setRoute} />
      {renderPage()}
    </div>
  );
};

export default App;
