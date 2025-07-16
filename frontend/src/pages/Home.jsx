import React from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Home = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <section className="relative min-h-screen px-6 py-16 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: {
            color: {
              value: "#111827",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 60,
              density: {
                enable: true,
                area: 800,
              },
            },
            color: {
              value: "#00fff7",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.4,
            },
            size: {
              value: 3,
              random: true,
            },
            links: {
              enable: true,
              color: "#00fff7",
              distance: 150,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              outModes: {
                default: "bounce",
              },
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to Smart Setu AI
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
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

      {/* Feature Cards */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {[
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
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-gray-900/40 to-gray-800/30 hover:from-green-800/30 hover:to-green-700/20 border border-gray-700 hover:border-green-500 rounded-xl p-6 backdrop-blur-sm text-white shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              {feature.title}
            </h3>
            <p className="text-gray-300">{feature.desc}</p>
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
