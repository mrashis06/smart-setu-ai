// ✅ Everything in one — All features clean & dependency-free
// Replace your existing Home.jsx with this version

import React, { useEffect, useState } from "react";
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

const tips = [
  "Most vendors don't realize they're eligible for ₹1L loans.",
  "78% of verified UPI users get better loan interest rates.",
  "A healthy profile boosts your loan chances by 40%.",
];

const dummyPredictions = [
  "👤 Bihar → Score: 702 | ₹75,000",
  "👤 Delhi → Score: 812 | ₹1,00,000",
  "👤 Assam → Score: 618 | ₹50,000",
];

const Home = () => {
  const [count, setCount] = useState({ vendors: 0, loans: 0, predictions: 0 });
  const [tipIndex, setTipIndex] = useState(0);
  const [recent, setRecent] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Live counters
    const interval = setInterval(() => {
      setCount((prev) => ({
        vendors: Math.min(prev.vendors + 3, 5412),
        loans: Math.min(prev.loans + 1, 42000000),
        predictions: Math.min(prev.predictions + 5, 13672),
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Tip rotator
    const t = setInterval(() => setTipIndex((i) => (i + 1) % tips.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Dummy recent predictions
    const interval = setInterval(() => {
      setRecent((prev) => [
        dummyPredictions[Math.floor(Math.random() * dummyPredictions.length)],
        ...prev.slice(0, 4),
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Geolocation (for personalization)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        fetch(`https://geocode.maps.co/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
          .then((res) => res.json())
          .then((data) => setLocation(data.address?.state || "your area"));
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen px-6 py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-green-500 dark:text-green-400 mb-6 whitespace-nowrap overflow-hidden border-r-4 border-green-500 animate-typing">
          Welcome to Smart Setu AI
        </h1>

        {location && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Hello vendor from <b>{location}</b> 👋
          </p>
        )}

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Empowering street vendors through AI-driven financial analysis, risk assessment, and government schemes.
        </p>

        <p className="italic text-green-600 dark:text-green-400 mb-6 transition-all duration-500">
          💡 {tips[tipIndex]}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Link to="/predictor" className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-all">
            Try Predictor
          </Link>
          <Link to="/govt" className="px-6 py-3 text-green-600 border border-green-600 hover:bg-green-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all">
            Explore Schemes
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-700 shadow-md rounded-xl p-6 transform transition duration-500 hover:-translate-y-2 hover:shadow-green-400/40 animate-fade-up"
          >
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* 🔥 Live Counters */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-lg">
        <div className="font-semibold">
          Vendors Helped<br /> <span className="text-green-500">{count.vendors.toLocaleString()}+</span>
        </div>
        <div className="font-semibold">
          Loan Estimated<br /> <span className="text-green-500">₹{(count.loans / 100000).toFixed(2)}L+</span>
        </div>
        <div className="font-semibold">
          Predictions Made<br /> <span className="text-green-500">{count.predictions.toLocaleString()}+</span>
        </div>
      </div>

      {/* 🧾 Recent Predictions */}
      <div className="mt-12 max-w-md mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-green-600 dark:text-green-400 text-md font-medium mb-2">Live Prediction Feed</h3>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          {recent.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
