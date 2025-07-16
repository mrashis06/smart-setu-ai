import React, { useState } from "react";

const Predictor = () => {
  const [formData, setFormData] = useState({
    monthlyTransactions: "",
    vendorType: "Food",
    upiUsage: "",
    isGovtApproved: false,
    healthCondition: "Good",
    hasLoan: false,
    loanAmount: "",
    loanTenure: "",
    loanInterest: "",
    loanPaid: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("https://smart-setu-ai.onrender.com/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
      else throw new Error(data?.error || "Prediction failed");
    } catch (err) {
      console.error("Prediction failed:", err);
      alert("Prediction failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className={`relative max-w-2xl mx-auto p-4 text-gray-900 dark:text-white transition duration-300 ${loading ? "blur-sm pointer-events-none" : ""}`}>
      <h1 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-400">
        Smart Setu Loan Predictor
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-[#111827] p-6 rounded-xl shadow-lg border border-green-500">
        <input type="number" name="monthlyTransactions" placeholder="Monthly Transactions (₹)" value={formData.monthlyTransactions} onChange={handleChange} required className="w-full p-2 rounded bg-gray-100 dark:bg-[#1f2937] text-black dark:text-white border border-gray-600" />

        <select name="vendorType" value={formData.vendorType} onChange={handleChange} className="w-full p-2 rounded bg-gray-100 dark:bg-[#1f2937] text-black dark:text-white border border-gray-600">
          <option value="Food">Food</option>
          <option value="Product">Product</option>
          <option value="Service">Service</option>
        </select>

        <input type="number" name="upiUsage" placeholder="UPI Usage (%)" value={formData.upiUsage} onChange={handleChange} required className="w-full p-2 rounded bg-gray-100 dark:bg-[#1f2937] text-black dark:text-white border border-gray-600" />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="isGovtApproved" checked={formData.isGovtApproved} onChange={handleChange} />
          Govt Approved Vendor?
        </label>

        <select name="healthCondition" value={formData.healthCondition} onChange={handleChange} className="w-full p-2 rounded bg-gray-100 dark:bg-[#1f2937] text-black dark:text-white border border-gray-600">
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Poor">Poor</option>
        </select>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="hasLoan" checked={formData.hasLoan} onChange={handleChange} />
          Has Existing Loan?
        </label>

        {formData.hasLoan && (
          <div className="space-y-2">
            <input type="number" name="loanAmount" placeholder="Existing Loan Amount (₹)" value={formData.loanAmount} onChange={handleChange} className="w-full p-2 rounded bg-gray-100 dark:bg-[#1f2937] text-black dark:text-white border border-gray-600" />
            <input type="number" name="loanTenure" placeholder="Loan Tenure (years)" value={formData.loanTenure} onChange={handleChange} className="w-full p-2 rounded bg-gray-100 dark:bg-[#1f2937] text-black dark:text-white border border-gray-600" />
            <input type="number" name="loanInterest" placeholder="Loan Interest Rate (%)" value={formData.loanInterest} onChange={handleChange} className="w-full p-2 rounded bg-gray-100 dark:bg-[#1f2937] text-black dark:text-white border border-gray-600" />
            <input type="number" name="loanPaid" placeholder="Amount Paid So Far (₹)" value={formData.loanPaid} onChange={handleChange} className="w-full p-2 rounded bg-gray-100 dark:bg-[#1f2937] text-black dark:text-white border border-gray-600" />
          </div>
        )}

        <button type="submit" disabled={loading} className="bg-green-500 text-black font-bold px-4 py-2 rounded hover:bg-green-400 transition duration-300">
          {loading ? "Predicting..." : "Predict Loan Eligibility"}
        </button>
      </form>

      {result && (
        <div className="mt-8 bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-green-400 animate-fade-in text-gray-900 dark:text-white">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-400 mb-3">Prediction Result</h2>
          <div className="space-y-1">
            <p><strong>Credit Score:</strong> {result.creditScore}</p>
            <p><strong>Risk Factor:</strong> {result.riskFactor}</p>
            <p><strong>Loan Possible:</strong> {result.loanPossible}</p>
            <p><strong>Loan Eligible:</strong> {result.loanEligible}</p>
            <p><strong>Repayment Period:</strong> {result.repaymentPeriod}</p>
          </div>
          <div className="mt-3">
            <h3 className="font-semibold">Interest Rates:</h3>
            <ul className="list-disc ml-5 text-sm">
              <li>SBI: {result.interestRates.SBI}</li>
              <li>HDFC: {result.interestRates.HDFC}</li>
              <li>ICICI: {result.interestRates.ICICI}</li>
            </ul>
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Predictor;
