import React from "react";

const UploadPage = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Credit Score Predictor</h2>
        {/* 👇 your form component inside */}
        <UploadForm />
      </div>
    </section>
  );
};

export default UploadPage;
