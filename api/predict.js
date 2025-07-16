import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config(); // Only needed if you're running this outside Next.js

// Initialize Gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const data = req.body;

  // Validate inputs
  if (
    !data.monthlyTransactions ||
    !data.vendorType ||
    data.upiUsage === undefined ||
    data.isGovtApproved === undefined ||
    !data.healthCondition
  ) {
    return res.status(400).json({ error: "Missing required fields", data });
  }

  // Construct the prompt
  const prompt = `You're an AI loan predictor. Based on the following inputs, respond ONLY with a JSON object:

Monthly Transactions: ₹${data.monthlyTransactions}
Vendor Type: ${data.vendorType}
UPI Usage: ${data.upiUsage}%
Govt Approved: ${data.isGovtApproved ? "Yes" : "No"}
Health: ${data.healthCondition}
Existing Loan: ${
    data.hasLoan
      ? `₹${data.loanAmount} for ${data.loanTenure} years at ${data.loanInterest}% with ₹${data.loanPaid} already paid.`
      : "No"
  }

Respond with EXACTLY this JSON structure and no explanation:
{
  "creditScore": number,
  "riskFactor": number,
  "loanPossible": string,
  "loanEligible": string,
  "interestRates": {
    "SBI": string,
    "HDFC": string,
    "ICICI": string
  },
  "repaymentPeriod": string
}`;

  try {
    // Create Gemini model instance
    const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });

    // Generate prediction from Gemini
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    console.log("🔥 Raw Gemini response:\n", text);

    // Extract JSON portion from messy LLM response
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const cleanJson = text.slice(jsonStart, jsonEnd + 1);

    try {
      const parsed = JSON.parse(cleanJson);
      return res.status(200).json(parsed);
    } catch (parseErr) {
      console.error("❌ JSON parsing failed:", parseErr.message);
      return res.status(500).json({
        error: "Gemini returned invalid JSON",
        rawResponse: text,
      });
    }
  } catch (err) {
    console.error("❌ Gemini API error:", err.message || err);
    return res.status(500).json({
      error: "Prediction failed",
      details: err.message || String(err),
    });
  }
}
