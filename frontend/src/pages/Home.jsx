import React from "react";

const Home = () => {
  return (
    <section className="min-h-screen px-6 py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to Smart Setu AI
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Empowering street vendors through AI-driven financial analysis, risk assessment, and government schemes.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/predictor"
            className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium transition"
          >
            Try Predictor
          </a>
          <a
            href="/govtschemes"
            className="px-6 py-3 text-green-600 border border-green-600 hover:bg-green-100 dark:hover:bg-gray-800 rounded-lg font-medium transition"
          >
            Explore Schemes
          </a>
        </div>
      </div>

      {/* Optional Illustration */}
      <div className="mt-16">
        <img
          src="https://illustrations.popsy.co/white/market.svg"
          alt="Street vendor AI illustration"
          className="w-full max-w-lg mx-auto"
        />
      </div>
    </section>
  );
};

export default Home;
