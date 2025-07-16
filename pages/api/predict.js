export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const data = req.body;

  // Destructure input
  const {
    monthlyTransactions,
    vendorType,
    upiUsage,
    isGovtApproved,
    healthCondition,
    hasLoan,
    loanAmount,
    loanTenure,
    loanInterest,
    loanPaid,
  } = data;

  let creditScore = 500;

  // 📊 Monthly transaction impact
  if (monthlyTransactions > 80000) creditScore += 150;
  else if (monthlyTransactions > 50000) creditScore += 100;
  else if (monthlyTransactions > 20000) creditScore += 50;

  // 📱 UPI usage
  if (upiUsage > 70) creditScore += 100;
  else if (upiUsage > 40) creditScore += 50;

  // ✅ Govt approval
  if (isGovtApproved) creditScore += 50;

  // 🧑‍⚕️ Health
  if (healthCondition === "Good") creditScore += 50;
  else if (healthCondition === "Average") creditScore += 20;
  else creditScore -= 30;

  // 💳 Existing loan
  if (hasLoan) {
    const loanPaidRatio = loanPaid / loanAmount;
    if (loanPaidRatio > 0.75) creditScore += 50;
    else if (loanPaidRatio > 0.5) creditScore += 20;
    else creditScore -= 50;
  }

  // Cap score
  creditScore = Math.max(300, Math.min(900, creditScore));

  // 🧮 Risk factor: 0 (low risk) to 10 (high risk)
  const riskFactor = parseFloat((10 - (creditScore / 90)).toFixed(2));

  // 💰 Loan eligibility
  const loanPossible = creditScore > 600 ? "Yes" : "No";
  const loanEligible = creditScore > 750 ? "₹100000" : creditScore > 600 ? "₹50000" : "₹0";

  // 🏦 Interest rates
  const interestRates = {
    SBI: riskFactor > 7 ? "15%" : riskFactor > 5 ? "12%" : "9%",
    HDFC: riskFactor > 7 ? "16%" : riskFactor > 5 ? "13%" : "10%",
    ICICI: riskFactor > 7 ? "14%" : riskFactor > 5 ? "11.5%" : "8.5%",
  };

  // ⏳ Repayment period
  let repaymentPeriod = "6 months";
  if (creditScore > 750) repaymentPeriod = "24 months";
  else if (creditScore > 650) repaymentPeriod = "12 months";

  // ✅ Final response
  return res.status(200).json({
    creditScore,
    riskFactor,
    loanPossible,
    loanEligible,
    interestRates,
    repaymentPeriod,
  });
}
