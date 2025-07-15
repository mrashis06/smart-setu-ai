import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md text-center">
        {!user ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Login with Google</h2>
            <button
              onClick={handleGoogleLogin}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Sign In with Google
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Welcome, {user.displayName}</h2>
            <img src={user.photoURL} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default Login;
