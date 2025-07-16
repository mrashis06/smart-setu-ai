import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext"; // ✅

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser(); // ✅

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid
      };

      localStorage.setItem("user", JSON.stringify(userInfo));
      setUser(userInfo); // ✅ update global state
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Login</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">Sign in with your Google account to continue</p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-all"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
