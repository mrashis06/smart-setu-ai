import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Predictor from "./pages/Predictor";
import Profile from "./pages/Profile";
import GovtSchemes from "./pages/GovtSchemes";
import Login from "./pages/Login";

const App = () => {
  const [route, setRoute] = useState("home");
  const [user, setUser] = useState(null); // ✅ add this

  const renderPage = () => {
    switch (route) {
      case "predictor":
        return <Predictor />;
      case "profile":
        return user ? <Profile user={user} /> : <Login setUser={setUser} setRoute={setRoute} />;
      case "govt":
        return <GovtSchemes />;
      case "login":
        return <Login setUser={setUser} setRoute={setRoute} />;
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
