export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const data = req.body;

  const prompt = `You're an AI loan predictor. Based on the following inputs, respond ONLY with a JSON object:

  Monthly Transactions: ${data.monthlyTransactions}
  Vendor Type: ${data.vendorType}
  UPI Usage: ${data.upiUsage}
  Govt Approved: ${data.isGovtApproved}
  Health: ${data.healthCondition}
  Existing Loan: ${data.hasLoan ? `₹${data.loanAmount} for ${data.loanTenure} years at ${data.loanInterest}% with ₹${data.loanPaid} already paid.` : "No"}

  Respond with this structure only:
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
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("Gemini raw response:", text); // ✅ See what Gemini returns

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const cleanJson = text.slice(jsonStart, jsonEnd + 1);

    const parsed = JSON.parse(cleanJson);
    res.status(200).json(parsed);
  } catch (err) {
    console.error("Gemini Error:", err); // ✅ Log actual error
    res.status(500).json({ error: "Prediction failed" });
  }
}
