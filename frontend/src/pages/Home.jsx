import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "AI Credit Score",
    desc: "Instantly analyze and get a smart credit score based on your financials.",
  },
  {
    title: "Loan Eligibility",
    desc: "Predict max eligible loan and repayment options instantly.",
  },
  {
    title: "Government Schemes",
    desc: "Discover verified schemes you qualify for as a vendor.",
  },
];

const Home = () => {
  return (
    <section className="relative min-h-screen px-6 py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Typewriter Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-green-500 dark:text-green-400 mb-6 whitespace-nowrap overflow-hidden border-r-4 border-green-500 animate-typing">
          Welcome to Smart Setu AI
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 transition-all">
          Empowering street vendors through AI-driven financial analysis, risk assessment, and government schemes.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Link
            to="/predictor"
            className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-all"
          >
            Try Predictor
          </Link>
          <Link
            to="/govt"
            className="px-6 py-3 text-green-600 border border-green-600 hover:bg-green-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all"
          >
            Explore Schemes
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-700 shadow-md rounded-xl p-6 transform transition duration-500 hover:-translate-y-2 hover:shadow-green-400/40 animate-fade-up delay-100"
          >
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Illustration */}
      <div className="relative z-10 mt-20">
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
