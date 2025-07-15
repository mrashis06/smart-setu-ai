import React from 'react';

const features = [
  "Upload 3-month bank statement (PDF)",
  "Enter ongoing loans and health details",
  "AI predicts risk score (0-10)",
  "Generates credit score & loan eligibility",
  "Recommends interest rate & repayment time"
];

const Features = () => {
  return (
    <section className="py-16 px-6 bg-gray-900">
      <h2 className="text-3xl font-semibold text-center mb-8">Key Features</h2>
      <ul className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
        {features.map((f, idx) => (
          <li key={idx} className="p-4 bg-gray-800 rounded-xl shadow-sm">{f}</li>
        ))}
      </ul>
    </section>
  );
};

export default Features;

