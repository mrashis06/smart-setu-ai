import React, { useState } from "react";

const Predictor = () => {
  const [formData, setFormData] = useState({
    bankStatement: "",
    existingLoan: false,
    healthCondition: "good",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy prediction result – plug in your real API logic here
    setResult({
      creditScore: 710,
      riskFactor: 3.2,
      loanEligible: "₹50,000",
      interestRate: "7.5%",
      repaymentPeriod: "12 months",
    });
  };

  return (
    <section className="min-h-screen px-6 py-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Smart Predictor</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md space-y-6"
        >
          <div>
            <label className="block mb-2 font-medium">Bank Statement Summary</label>
            <textarea
              name="bankStatement"
              rows="4"
              placeholder="e.g., Monthly income ₹10,000, Rent ₹3,000, Utilities ₹1,500..."
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
              value={formData.bankStatement}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="existingLoan"
              name="existingLoan"
              checked={formData.existingLoan}
              onChange={handleChange}
              className="accent-green-600"
            />
            <label htmlFor="existingLoan">Do you have an existing loan?</label>
          </div>

          <div>
            <label className="block mb-2 font-medium">Health Condition</label>
            <select
              name="healthCondition"
              value={formData.healthCondition}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
            >
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Predict Now
          </button>
        </form>

        {result && (
          <div className="mt-10 p-6 rounded-xl bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100">
            <h2 className="text-2xl font-bold mb-4">Prediction Result</h2>
            <ul className="space-y-2">
              <li>Credit Score: <span className="font-semibold">{result.creditScore}</span></li>
              <li>Risk Factor: <span className="font-semibold">{result.riskFactor}</span></li>
              <li>Loan Eligible: <span className="font-semibold">{result.loanEligible}</span></li>
              <li>Interest Rate: <span className="font-semibold">{result.interestRate}</span></li>
              <li>Repayment Period: <span className="font-semibold">{result.repaymentPeriod}</span></li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Predictor;
