import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-950 dark:text-white text-gray-900">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-tight">
        SmartSetu<span className="text-green-500">AI</span>
      </div>

      {/* Nav Items */}
      <div className="flex items-center space-x-6">
        <a href="#" className="hover:text-green-500 transition-colors">Home</a>
        <a href="#" className="hover:text-green-500 transition-colors">Login / Profile</a>
        <a href="#" className="hover:text-green-500 transition-colors">Predictor</a>
        <a href="#" className="hover:text-green-500 transition-colors">Govt. Schemes</a>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full focus:outline-none"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <span role="img" aria-label="light">🌞</span>
          ) : (
            <span role="img" aria-label="dark">🌙</span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
