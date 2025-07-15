import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [loan, setLoan] = useState('');
  const [health, setHealth] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !loan || !health) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('loan_status', loan);
    formData.append('health_condition', health);

    try {
      const res = await axios.post('https://smart-setu-backend.onrender.com/predict', formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-16 px-6 bg-black text-white">
      <h2 className="text-3xl font-semibold text-center mb-8">Upload Bank Statement</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4 bg-gray-900 p-6 rounded-xl shadow-md">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Ongoing loan (Yes/No)"
          value={loan}
          onChange={(e) => setLoan(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Health condition (e.g., None / Diabetes)"
          value={health}
          onChange={(e) => setHealth(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded text-white font-semibold"
        >
          Submit
        </button>
      </form>

      {result && (
        <div className="mt-10 max-w-md mx-auto bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Credit Report</h3>
          <p><strong>Risk Score:</strong> {result.risk_score}</p>
          <p><strong>Credit Score:</strong> {result.credit_score}</p>
          <p><strong>Eligible Loan:</strong> ₹{result.eligible_loan}</p>
          <p><strong>Interest Rate:</strong> {result.interest_rate}%</p>
          <p><strong>Suggested Tenure:</strong> {result.repayment_period} months</p>
        </div>
      )}
    </section>
  );
};

export default UploadForm;

