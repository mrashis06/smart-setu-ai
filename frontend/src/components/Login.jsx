import React from "react";

const Login = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm mt-4 text-gray-500 dark:text-gray-400">
          Don't have an account? <span className="text-green-500 cursor-pointer hover:underline">Sign up</span>
        </p>
      </div>
    </section>
  );
};

export default Login;
