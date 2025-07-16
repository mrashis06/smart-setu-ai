import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const Predictor = () => {
  const [formData, setFormData] = useState({
    monthlyTransactions: "",
    vendorType: "Food",
    upiUsage: "Frequent",
    isGovtApproved: false,
    hasLoan: false,
    loanAmount: "",
    loanTenure: "",
    loanInterest: "",
    loanPaid: "",
    healthCondition: "Good",
  });

  const [result, setResult] = useState(null);
  const [customLoan, setCustomLoan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const prompt = `
You're a credit advisor AI.

Based on the vendor details, predict:
1. Credit Score (300–900)
2. Risk Factor (0–10)
3. Is loan possible? (Yes/No)
4. Max loan eligible (under ₹1,00,000)
5. Show interest rates from banks like SBI, HDFC, ICICI
6. Recommend suitable repayment tenure

Input:
- Monthly Transactions: ${formData.monthlyTransactions}
- Vendor Type: ${formData.vendorType}
- UPI Usage: ${formData.upiUsage}
- Govt Approved: ${formData.isGovtApproved ? "Yes" : "No"}
- Existing Loan: ${formData.hasLoan ? `Yes, ₹${formData.loanAmount}, ${formData.loanTenure} yrs @ ${formData.loanInterest}%, ₹${formData.loanPaid} paid` : "No"}
- Health Condition: ${formData.healthCondition}

Respond only in JSON.
    `;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const response = await model.generateContent(prompt);
      const text = response.response.text();

      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}");
      const jsonString = text.substring(jsonStart, jsonEnd + 1);
      const parsed = JSON.parse(jsonString);

      setResult(parsed);
      setCustomLoan({
        amount: parsed.loanEligible || "₹0",
        tenure: parsed.repaymentPeriod || "6 months",
      });
    } catch (error) {
      console.error("Gemini error:", error);
      setResult({ error: "Prediction failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen px-6 py-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Smart Loan Predictor</h1>
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl space-y-6">
          <input
            type="text"
            name="monthlyTransactions"
            placeholder="Monthly Transactions Summary"
            value={formData.monthlyTransactions}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />

          <select name="vendorType" value={formData.vendorType} onChange={handleChange} className="w-full p-3 border rounded-md">
            <option>Food</option>
            <option>Product</option>
            <option>Service</option>
          </select>

          <select name="upiUsage" value={formData.upiUsage} onChange={handleChange} className="w-full p-3 border rounded-md">
            <option>Frequent</option>
            <option>Occasional</option>
            <option>None</option>
          </select>

          <div className="flex items-center gap-3">
            <input type="checkbox" name="isGovtApproved" checked={formData.isGovtApproved} onChange={handleChange} />
            <label>Govt Approved Vendor</label>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" name="hasLoan" checked={formData.hasLoan} onChange={handleChange} />
            <label>Has an Existing Loan</label>
          </div>

          {formData.hasLoan && (
            <>
              <input type="number" name="loanAmount" placeholder="Loan Amount (₹)" value={formData.loanAmount} onChange={handleChange} className="w-full p-3 border rounded-md" />
              <input type="number" name="loanTenure" placeholder="Loan Tenure (Years)" value={formData.loanTenure} onChange={handleChange} className="w-full p-3 border rounded-md" />
              <input type="number" name="loanInterest" placeholder="Interest Rate (%)" value={formData.loanInterest} onChange={handleChange} className="w-full p-3 border rounded-md" />
              <input type="number" name="loanPaid" placeholder="Amount Already Paid (₹)" value={formData.loanPaid} onChange={handleChange} className="w-full p-3 border rounded-md" />
            </>
          )}

          <select name="healthCondition" value={formData.healthCondition} onChange={handleChange} className="w-full p-3 border rounded-md">
            <option>Good</option>
            <option>Average</option>
            <option>Critical</option>
          </select>

          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg">
            {loading ? "Predicting..." : "Predict Now"}
          </button>
        </form>

        {result && !result.error && (
          <div className="mt-10 p-6 rounded-xl bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 space-y-3">
            <h2 className="text-2xl font-bold">Prediction Result</h2>
            <p>Credit Score: <strong>{result.creditScore}</strong></p>
            <p>Risk Factor: <strong>{result.riskFactor}</strong></p>
            <p>Loan Possible: <strong>{result.loanPossible || "Yes"}</strong></p>
            <p>Max Eligible Loan: <strong>{result.loanEligible}</strong></p>
            <p>Interest Rates:</p>
            <ul className="list-disc list-inside">
              {result.interestRates && Object.entries(result.interestRates).map(([bank, rate]) => (
                <li key={bank}>{bank}: {rate}</li>
              ))}
            </ul>
            <p>Recommended Tenure: <strong>{result.repaymentPeriod}</strong></p>

            <div className="pt-4 space-y-2">
              <h3 className="font-semibold">Customize Your Loan</h3>
              <input
                type="text"
                value={customLoan.amount}
                onChange={(e) => setCustomLoan({ ...customLoan, amount: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                value={customLoan.tenure}
                onChange={(e) => setCustomLoan({ ...customLoan, tenure: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        )}

        {result?.error && <p className="text-red-500 mt-4 text-center">{result.error}</p>}
      </div>
    </section>
  );
};

export default Predictor;
