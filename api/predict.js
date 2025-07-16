import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Only POST allowed");
  }

  const data = req.body;

  const prompt = `You're an AI loan predictor. Predict based on:
  - Monthly Transactions: ${data.monthlyTransactions}
  - Vendor Type: ${data.vendorType}
  - UPI Usage: ${data.upiUsage}
  - Govt Approved: ${data.isGovtApproved}
  - Health: ${data.healthCondition}
  - Existing Loan: ${data.hasLoan ? `Yes, ₹${data.loanAmount}, ${data.loanTenure} yrs @ ${data.loanInterest}%, ₹${data.loanPaid} paid` : "No"}

Respond only in JSON format containing:
creditScore, riskFactor, loanPossible, loanEligible (<= ₹1L), interestRates (SBI, HDFC, ICICI), repaymentPeriod`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const jsonString = text.slice(jsonStart, jsonEnd + 1);
    const parsed = JSON.parse(jsonString);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Gemini API failed:", err);
    return res.status(500).json({ error: "Prediction failed" });
  }
}
