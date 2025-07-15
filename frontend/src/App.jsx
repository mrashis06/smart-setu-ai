import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Hero />
      <Features />
      <UploadForm />
    </div>
  );
}

export default App;

