import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <Hero />
      <Features />
      <UploadForm />
    </div>
  );
}

export default App;
