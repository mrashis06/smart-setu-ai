import random

def generate_credit_profile(loan_status: str, health_condition: str):
    """
    Mock logic to generate a credit profile based on basic conditions.
    Replace this with actual AI logic later.
    """

    # 🔁 Sample scoring logic:
    base_score = 700

    # Penalize if loan is ongoing
    if loan_status.strip().lower() in ["yes", "y", "ongoing"]:
        base_score -= 80

    # Penalize for known health issues
    if health_condition.strip().lower() not in ["none", "healthy", "na"]:
        base_score -= 50

    # Add a bit of randomness
    base_score += random.randint(-20, 20)

    # Clamp between 300 and 850
    credit_score = max(300, min(base_score, 850))

    # Map credit score to risk score (lower score = higher risk)
    risk_score = round((850 - credit_score) / 110, 1)  # scale to 0-10

    # Decide eligible loan
    eligible_loan = int((credit_score / 850) * 100000)  # up to ₹1L

    # Interest rate logic (higher risk = higher interest)
    interest_rate = round(10 + (risk_score * 1.2), 2)  # 10% to ~22%

    # Tenure suggestion
    repayment_period = 12 if risk_score < 5 else 6

    return {
        "risk_score": risk_score,
        "credit_score": credit_score,
        "eligible_loan": eligible_loan,
        "interest_rate": interest_rate,
        "repayment_period": repayment_period
    }
