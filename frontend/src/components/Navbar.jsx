import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`You searched for: ${searchQuery}`);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-950 dark:text-white text-gray-900">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-tight">
        SmartSetu<span className="text-green-500">AI</span>
      </Link>

      {/* Middle: Search bar (hidden on small screens) */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full"
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none text-sm w-48 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="text-green-500 font-semibold text-sm hover:underline"
        >
          Go
        </button>
      </form>

      {/* Right: Nav links and dark toggle */}
      <div className="flex items-center space-x-4 text-sm sm:text-base mt-3 sm:mt-0">
        <Link to="/" className="hover:text-green-500 transition-colors">
          Home
        </Link>
        <Link to="/predictor" className="hover:text-green-500 transition-colors">
          Predictor
        </Link>
        <Link to="/schemes" className="hover:text-green-500 transition-colors">
          Govt Schemes
        </Link>
        <Link to="/login" className="hover:text-green-500 transition-colors">
          Login / Profile
        </Link>

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
