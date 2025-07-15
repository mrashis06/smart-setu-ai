import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import UploadForm from './components/UploadForm';
import GovtSchemes from './components/GovtSchemes';

function App() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <Navbar />
      <Hero />
      <Features />
      <UploadForm />
      <GovtSchemes />
    </div>
  );
}

export default App;
