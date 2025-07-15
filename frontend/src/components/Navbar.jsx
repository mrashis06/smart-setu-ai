import React from "react";

const Navbar = ({ setRoute }) => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow">
      <div className="text-xl font-bold cursor-pointer" onClick={() => setRoute("home")}>
        SmartSetu.AI
      </div>
      <div className="flex items-center space-x-6">
        <button onClick={() => setRoute("home")}>Home</button>
        <button onClick={() => setRoute("predictor")}>Predictor</button>
        <button onClick={() => setRoute("govt")}>Govt Schemes</button>
        <button onClick={() => setRoute("profile")}>Profile</button>
      </div>
    </nav>
  );
};


export default Navbar;
