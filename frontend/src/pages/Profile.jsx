import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <section className="min-h-screen px-6 py-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      <div className="max-w-lg mx-auto bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md text-center">
        <img
          src={user.photo}
          alt={user.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-500"
        />
        <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{user.email}</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default Profile;
