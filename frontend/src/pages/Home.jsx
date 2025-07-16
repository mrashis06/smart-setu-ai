import React from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

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
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <section className="relative min-h-screen px-6 py-16 bg-[#0d1117] text-white overflow-hidden">
      {/* Particles */}
      <Particles
        className="absolute inset-0 z-0"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 60 },
            color: { value: "#00fff7" },
            links: { enable: true, color: "#00fff7", opacity: 0.2 },
            move: { enable: true, speed: 1.5 },
            size: { value: 3 },
            opacity: { value: 0.4 },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
            },
            modes: {
              repulse: { distance: 100 },
            },
          },
        }}
      />

      {/* 🇮🇳 Indian flag wave bg */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-5">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
          alt="India flag"
          className="w-full h-full object-cover animate-pulse"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-6">
          <Typewriter
            words={["Welcome to Smart Setu AI"]}
            loop={1}
            typeSpeed={60}
            cursor
            cursorStyle="|"
          />
        </h1>

        <p className="text-lg text-gray-300 mb-10">
          Empowering street vendors through AI-driven financial analysis, risk assessment, and government schemes.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Link
            to="/predictor"
            className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium transition"
          >
            Try Predictor
          </Link>
          <Link
            to="/govt"
            className="px-6 py-3 text-green-600 border border-green-600 hover:bg-green-100 dark:hover:bg-gray-800 rounded-lg font-medium transition"
          >
            Explore Schemes
          </Link>
        </div>
      </div>

      {/* Feature Cards with slide-up */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * idx, duration: 0.6, ease: "easeOut" }}
            className="bg-gradient-to-br from-gray-900/40 to-gray-800/30 hover:from-green-800/30 hover:to-green-700/20 border border-gray-700 hover:border-green-500 rounded-xl p-6 backdrop-blur-sm text-white shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              {feature.title}
            </h3>
            <p className="text-gray-300">{feature.desc}</p>
          </motion.div>
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
