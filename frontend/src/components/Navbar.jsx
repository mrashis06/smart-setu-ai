import React, { useState, useEffect } from "react";

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
    // Later: Redirect or filter data
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-950 dark:text-white text-gray-900">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-tight">
        SmartSetu<span className="text-green-500">AI</span>
      </div>

      {/* Middle: Search bar */}
      <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none text-sm w-48 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
        />
        <button type="submit" className="text-green-500 font-semibold text-sm hover:underline">Go</button>
      </form>

      {/* Right: Nav items */}
      <div className="flex items-center space-x-4">
        <a href="#" className="hover:text-green-500 transition-colors hidden sm:block">Home</a>
        <a href="#" className="hover:text-green-500 transition-colors hidden sm:block">Predictor</a>
        <a href="#" className="hover:text-green-500 transition-colors hidden sm:block">Govt. Schemes</a>
        <a href="#" className="hover:text-green-500 transition-colors hidden sm:block">Login / Profile</a>

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
