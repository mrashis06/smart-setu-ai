from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

# Allow all origins for now (Vercel frontend will call this)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with Vercel domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict_score(
    file: UploadFile = File(...),
    loan_status: str = Form(...),
    health_condition: str = Form(...)
):
    # 🛠️ TODO: parse PDF, analyze transaction data, etc.
    print("Received file:", file.filename)
    print("Loan Status:", loan_status)
    print("Health Condition:", health_condition)

    # 🔮 Return mock results (will be replaced with AI logic later)
    response = {
        "risk_score": 3.8,
        "credit_score": 690,
        "eligible_loan": 60000,
        "interest_rate": 12.5,
        "repayment_period": 12  # months
    }

    return JSONResponse(content=response)

