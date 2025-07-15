import React, { useState } from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Login = () => {
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;

      // Set local state
      setUser(userData);

      // Store or update in Firestore
      const userRef = doc(db, "users", userData.uid);
      const existing = await getDoc(userRef);

      if (!existing.exists()) {
        await setDoc(userRef, {
          name: userData.displayName,
          email: userData.email,
          photoURL: userData.photoURL,
          createdAt: new Date().toISOString()
        });
      }

    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
        {!user ? (
          <>
            <h2 className="text-xl font-bold mb-4">Login to SmartSetu</h2>
            <button
              onClick={handleGoogleLogin}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            >
              Sign in with Google
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Welcome, {user.displayName}</h2>
            <img src={user.photoURL} className="w-20 h-20 rounded-full mx-auto mb-3" alt="Profile" />
            <p>{user.email}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
