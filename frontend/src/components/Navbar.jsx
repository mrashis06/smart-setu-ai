import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setRoute }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));

    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;
      const userInfo = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        photo: loggedUser.photoURL,
        uid: loggedUser.uid,
      };
      localStorage.setItem("user", JSON.stringify(userInfo));
      setUser(userInfo);
      setRoute("profile");
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      setRoute("home");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  const NavLinks = () => (
  <>
    <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-green-500">Home</Link>
    <Link to="/predictor" onClick={() => setMenuOpen(false)} className="hover:text-green-500">Predictor</Link>
    <Link to="/govt" onClick={() => setMenuOpen(false)} className="hover:text-green-500">Schemes</Link>
    {user ? (
      <>
        <Link to="/profile" onClick={() => setMenuOpen(false)}>
          <img
            src={user.photo}
            alt="profile"
            className="w-8 h-8 rounded-full border border-green-500"
          />
        </Link>
        <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">Logout</button>
      </>
    ) : (
      <button
        onClick={handleLogin}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
      >
        Login
      </button>
    )}
  </>
);

  return (
    <nav className="w-full px-6 py-4 bg-white dark:bg-gray-900 shadow-md flex justify-between items-center">
      <button onClick={() => setRoute("home")} className="text-xl font-bold text-green-600 dark:text-green-400">
        SmartSetu
      </button>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-6 items-center text-gray-700 dark:text-gray-300">
        <NavLinks />
        <button onClick={toggleDarkMode} className="ml-4">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center gap-4">
        <button onClick={toggleDarkMode}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 p-6 flex flex-col gap-4 text-center shadow-md z-10 md:hidden text-gray-700 dark:text-gray-300">
          <NavLinks />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
