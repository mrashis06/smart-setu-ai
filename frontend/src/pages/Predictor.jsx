import React from "react";

const Predictor = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Credit Score Predictor</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Upload your last 3 months' bank statements and health status. We'll calculate your risk factor and credit eligibility using SmartSetu AI.
      </p>

      <form className="space-y-4">
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          className="block w-full border border-gray-300 rounded px-4 py-2"
        />

        <input
          type="number"
          placeholder="Current Loan Amount (if any)"
          className="block w-full border border-gray-300 rounded px-4 py-2"
        />

        <select className="block w-full border border-gray-300 rounded px-4 py-2">
          <option value="">Select Health Condition</option>
          <option value="none">No major illness</option>
          <option value="chronic">Chronic illness</option>
          <option value="critical">Critical condition</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Predict Credit Score
        </button>
      </form>
    </div>
  );
};

export default Predictor;
