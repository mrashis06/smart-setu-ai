import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const data = req.body;

  const prompt = `You're an AI loan predictor. Based on the following inputs, respond ONLY with a JSON object:

Monthly Transactions: ${data.monthlyTransactions}
Vendor Type: ${data.vendorType}
UPI Usage: ${data.upiUsage}
Govt Approved: ${data.isGovtApproved}
Health: ${data.healthCondition}
Existing Loan: ${data.hasLoan ? `₹${data.loanAmount} for ${data.loanTenure} years at ${data.loanInterest}% with ₹${data.loanPaid} already paid.` : "No"}

Respond with a pure JSON (no explanation) like:
{
  "creditScore": 720,
  "riskFactor": 2.5,
  "loanPossible": "Yes",
  "loanEligible": "₹90,000",
  "interestRates": {
    "SBI": "8.5%",
    "HDFC": "9.2%",
    "ICICI": "9.0%"
  },
  "repaymentPeriod": "12 months"
}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON safely
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const rawJson = text.slice(jsonStart, jsonEnd + 1);

    const parsed = JSON.parse(rawJson); // might still fail if Gemini messed up
    res.status(200).json(parsed);

  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    res.status(500).json({ error: "Prediction failed" });
  }
}
