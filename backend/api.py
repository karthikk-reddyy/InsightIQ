current_df = None
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
from dotenv import load_dotenv
import google.generativeai as genai
from pydantic import BaseModel
import shutil
from prophet import Prophet
from pydantic import BaseModel
from fastapi.responses import FileResponse
from pdf_report import generate_pdf
current_report = None
current_df = None
from fastapi.responses import FileResponse
from pdf_report import generate_pdf
class ForecastRequest(BaseModel):
    column: str
    periods: int

# ======================================================
# Gemini Configuration
# ======================================================

load_dotenv()


genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

gemini_model = genai.GenerativeModel("gemini-2.5-flash")

# ======================================================
# FastAPI App
# ======================================================

app = FastAPI(
    title="InsightIQ API",
    version="1.0.0"
)
current_df = None

# ======================================================
# CORS
# ======================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================================================
# Home
# ======================================================

@app.get("/")
def home():
    return {
        "message": "InsightIQ Backend Running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "OK"
    }

# ======================================================
# Upload Dataset
# ======================================================
@app.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):

    global current_df

    # Read Dataset
    if file.filename.endswith(".csv"):
        df = pd.read_csv(file.file)

    elif file.filename.endswith(".xlsx") or file.filename.endswith(".xls"):
        df = pd.read_excel(file.file)

    else:
        return {
            "error": "Unsupported file type"
        }

    # Save dataset globally
    current_df = df

    # Dataset Information
    rows = len(df)
    columns = len(df.columns)

    missing_values = int(df.isna().sum().sum())
    duplicates = int(df.duplicated().sum())
    # ==========================
    # Dataset Quality Score
    # ==========================

    if missing_values == 0 and duplicates == 0:

        quality = "Excellent"

    elif missing_values < rows * 0.05:

        quality = "Good"

    else:

        quality = "Needs Cleaning"

    memory_usage = round(
        df.memory_usage(deep=True).sum() / (1024 * 1024),
        2
    )

    numeric_columns = list(
        df.select_dtypes(include="number").columns
    )

    categorical_columns = list(
        df.select_dtypes(exclude="number").columns
    )

    preview = (
        df.head(10)
        .fillna("")
        .to_dict(orient="records")
    )
    # -------------------------
    # Detect Primary KPI
    # -------------------------

    preferred_columns = [
        "Sales",
        "Revenue",
        "Amount",
        "Profit",
        "Income",
        "Price",
        "Cost"
    ]

    numeric_columns = list(df.select_dtypes(include="number").columns)

    primary_kpi = None

    for col in preferred_columns:
        if col in df.columns:
            primary_kpi = col
            break

    if primary_kpi is None and numeric_columns:
        primary_kpi = numeric_columns[0]

    # -------------------------
    # Business KPIs
    # -------------------------

    kpis = {}

    if primary_kpi:

        kpis = {

            "column": str(primary_kpi),

            "total": float(df[primary_kpi].sum()),

            "average": float(df[primary_kpi].mean()),

            "maximum": float(df[primary_kpi].max()),

            "minimum": float(df[primary_kpi].min())

        }
        # =====================================================
        # Top Performers
        # =====================================================

        top_performers = {}

        if primary_kpi:

            for col in categorical_columns:

                try:

                    grouped = (
                        df.groupby(col)[primary_kpi]
                        .sum()
                        .sort_values(ascending=False)
                    )

                    if len(grouped) > 0:

                        top_performers[col] = {

                            "name": str(grouped.index[0]),

                            "value": float(grouped.iloc[0])

                        }

                except:

                    pass

    # ---------- Gemini AI ----------
    prompt = f"""
You are an expert Business Intelligence Analyst.

Analyze this dataset.

Filename: {file.filename}

Rows: {rows}

Columns: {columns}

Missing Values: {missing_values}

Duplicate Rows: {duplicates}

Numeric Columns:
{", ".join(numeric_columns)}

Categorical Columns:
{", ".join(categorical_columns)}

Generate:

1. Dataset Summary
2. Data Quality
3. Important Observations
4. Business Recommendations

Keep response below 150 words.
"""

    try:
        response = gemini_model.generate_content(prompt)
        ai_summary = response.text

    except Exception as e:
        ai_summary = f"Gemini Error: {str(e)}"

    return {

        "filename": file.filename,

        "rows": rows,

        "columns": columns,

        "column_names": list(df.columns),

        "missing_values": missing_values,

        "duplicates": duplicates,

        "memory_usage": memory_usage,

        "numeric_columns": numeric_columns,

        "categorical_columns": categorical_columns,

        "preview": preview,

        "top_performers": top_performers,

        "kpis": kpis,

        "quality": quality,

        "data": df.fillna("").to_dict(orient="records"),

        "ai_summary": ai_summary,

        "ai_insights": {

            "summary": f"The dataset contains {rows} rows and {columns} columns.",

            "quality": (
                "Excellent"
                if missing_values == 0
                else "Missing values detected."
            ),

            "recommendation": (
                "Dataset is ready for analytics."
                if missing_values == 0
                else "Clean missing values before analysis."
            ),

            "duplicates": (
                "No duplicate records."
                if duplicates == 0
                else f"{duplicates} duplicate rows found."
            )

        }

    }
    # ======================================================
    # Gemini AI Analysis
    # ======================================================

    prompt = f"""
You are an expert Business Intelligence Analyst.

Analyze this dataset.

Filename:
{file.filename}

Rows:
{rows}

Columns:
{columns}

Missing Values:
{missing_values}

Duplicate Rows:
{duplicates}

Numeric Columns:
{", ".join(numeric_columns)}

Categorical Columns:
{", ".join(categorical_columns)}

Generate:

1. Dataset Summary

2. Data Quality

3. Important Observations

4. Business Recommendations

Keep response below 150 words.
"""

    try:
        response = model.generate_content(prompt)

        print("=" * 60)
        print("Gemini Response:")
        print(response)
        print("=" * 60)

        ai_summary = response.text

        print("AI Summary:")
        print(ai_summary)
        print("=" * 60)

    except Exception as e:

        print("Gemini Error:")
        print(e)

        ai_summary = f"Gemini Error: {str(e)}"

    # ======================================================
    # Return Response
    # ======================================================

    return {

        "filename": file.filename,

        "rows": rows,

        "columns": columns,

        "column_names": list(df.columns),

        "missing_values": missing_values,

        "duplicates": duplicates,

        "memory_usage": memory_usage,

        "numeric_columns": numeric_columns,

        "categorical_columns": categorical_columns,

        "preview": preview,

        "ai_summary": ai_summary,

        "ai_insights": {

            "summary": f"The dataset contains {rows} rows and {columns} columns.",

            "quality": (
                "Excellent"
                if missing_values == 0
                else "Missing values detected."
            ),

            "recommendation": (
                "Dataset is ready for analytics."
                if missing_values == 0
                else "Clean missing values before analysis."
            ),

            "duplicates": (
                "No duplicate records."
                if duplicates == 0
                else f"{duplicates} duplicate rows found."
            )

        }

    }

# ======================================================
# Dynamic Chart Data
# ======================================================

@app.post("/chart-data")
async def chart_data(file: UploadFile = File(...)):

    if file.filename.endswith(".csv"):
        df = pd.read_csv(file.file)

    elif file.filename.endswith(".xlsx") or file.filename.endswith(".xls"):
        df = pd.read_excel(file.file)

    else:
        return {
            "error": "Unsupported file type"
        }

    numeric_columns = list(
        df.select_dtypes(include="number").columns
    )

    categorical_columns = list(
        df.select_dtypes(exclude="number").columns
    )

    if len(numeric_columns) == 0:
        return {
            "error": "No numeric columns found."
        }

    bar_chart = []

    if len(categorical_columns) > 0:

        category = categorical_columns[0]

        value = numeric_columns[0]

        grouped = (
            df.groupby(category)[value]
            .sum()
            .reset_index()
        )

        bar_chart = grouped.to_dict(orient="records")

    line_chart = []

    value = numeric_columns[0]

    line_chart = [

        {
            "index": i + 1,
            value: float(v)
        }

        for i, v in enumerate(df[value].fillna(0))

    ]

    pie_chart = bar_chart

    return {

        "category_column": (
            categorical_columns[0]
            if categorical_columns
            else ""
        ),

        "value_column": value,

        "bar_chart": bar_chart,

        "line_chart": line_chart,

        "pie_chart": pie_chart

    }
from pydantic import BaseModel

class ChatRequest(BaseModel):
    question: str


@app.post("/ask-ai")
async def ask_ai(chat: ChatRequest):

    global current_df

    if current_df is None:
        return {
            "answer": "Please upload a dataset first."
        }

    dataset = current_df.head(100).to_csv(index=False)

    prompt = f"""
You are an expert Business Intelligence Analyst.

Here is the dataset:

{dataset}

User Question:
{chat.question}

Answer ONLY using the dataset.
If the answer is not available, say:
'I couldn't find that information in the dataset.'
"""

    try:
        response = gemini_model.generate_content(prompt)

        return {
            "answer": response.text
        }

    except Exception as e:

        return {
            "answer": str(e)
        }
@app.post("/forecast")
async def forecast(request: ForecastRequest):

    global current_df

    if current_df is None:
        return {
            "error": "Upload a dataset first."
        }

    df = current_df.copy()

    # -----------------------------------------
    # Detect Date Column
    # -----------------------------------------

    date_column = None

    for col in df.columns:

        try:
            pd.to_datetime(df[col])
            date_column = col
            break

        except:
            pass

    if date_column is None:

        return {
            "error": "No date column found."
        }

    # -----------------------------------------
    # Prepare Prophet Data
    # -----------------------------------------

    prophet_df = pd.DataFrame({

        "ds": pd.to_datetime(df[date_column]),

        "y": df[request.column]

    })

    prophet_df = prophet_df.dropna()

    # -----------------------------------------
    # Train Prophet Model
    # -----------------------------------------

    prophet_model = Prophet()

    prophet_model.fit(prophet_df)

    # -----------------------------------------
    # Generate Future Dates
    # -----------------------------------------

    future = prophet_model.make_future_dataframe(
        periods=request.periods
    )

    forecast = prophet_model.predict(future)

    # -----------------------------------------
    # Future Predictions
    # -----------------------------------------

    result = forecast.tail(request.periods)[
        ["ds", "yhat", "yhat_lower", "yhat_upper"]
    ]

    result = result.rename(columns={

        "ds": "date",

        "yhat": "prediction",

        "yhat_lower": "lower",

        "yhat_upper": "upper"

    })

    # -----------------------------------------
    # AI Forecast Analysis
    # -----------------------------------------

    forecast_summary = f"""
Average Prediction : {result['prediction'].mean():.2f}

Maximum Prediction : {result['prediction'].max():.2f}

Minimum Prediction : {result['prediction'].min():.2f}

Forecast Days : {request.periods}

Metric Forecasted : {request.column}
"""

    prompt = f"""
You are a Senior Business Intelligence Analyst.

Analyze this forecast.

{forecast_summary}

Provide:

1. Forecast Summary

2. Business Meaning

3. Risks

4. Recommendations

Keep the answer under 120 words.
"""

    try:

        response = gemini_model.generate_content(prompt)

        ai_analysis = response.text

    except Exception as e:

        import traceback

        traceback.print_exc()

        ai_analysis = f"Gemini Error: {str(e)}"

    # -----------------------------------------
    # Return Response
    # -----------------------------------------

    return {

        "forecast": result.to_dict(
            orient="records"
        ),

        "ai_analysis": ai_analysis

    }
from fastapi.responses import FileResponse

@app.get("/download-report")
def download_report():

    global current_df

    if current_df is None:

        return {
            "error": "No dataset uploaded."
        }

    # -----------------------------
    # Dataset Information
    # -----------------------------

    rows = len(current_df)

    columns = len(current_df.columns)

    missing_values = int(current_df.isna().sum().sum())

    duplicates = int(current_df.duplicated().sum())

    # -----------------------------
    # Detect Primary KPI
    # -----------------------------

    numeric_columns = list(
        current_df.select_dtypes(include="number").columns
    )

    preferred_columns = [
        "Sales",
        "Revenue",
        "Amount",
        "Profit",
        "Income",
        "Price",
        "Cost"
    ]

    primary_kpi = None

    for col in preferred_columns:

        if col in current_df.columns:

            primary_kpi = col

            break

    if primary_kpi is None and len(numeric_columns) > 0:

        primary_kpi = numeric_columns[0]

    # -----------------------------
    # KPIs
    # -----------------------------

    kpis = {

        "column": "",

        "total": 0,

        "average": 0,

        "maximum": 0,

        "minimum": 0

    }

    if primary_kpi:

        kpis = {

            "column": primary_kpi,

            "total": float(current_df[primary_kpi].sum()),

            "average": float(current_df[primary_kpi].mean()),

            "maximum": float(current_df[primary_kpi].max()),

            "minimum": float(current_df[primary_kpi].min())

        }

    # -----------------------------
    # AI Summary
    # -----------------------------

    ai_summary = "AI Summary unavailable."

    try:

        prompt = f"""

Generate a short business summary.

Rows: {rows}

Columns: {columns}

Primary KPI: {primary_kpi}

"""

        response = gemini_model.generate_content(prompt)

        ai_summary = response.text

    except:

        pass

    # -----------------------------
    # Data passed to PDF
    # -----------------------------

    report_data = {

        "filename": "Uploaded Dataset",

        "rows": rows,

        "columns": columns,

        "missing_values": missing_values,

        "duplicates": duplicates,

        "kpis": kpis,

        "ai_summary": ai_summary

    }

    pdf_path = "InsightIQ_Report.pdf"

    generate_pdf(report_data, pdf_path)

    return FileResponse(

        pdf_path,

        filename="InsightIQ_Report.pdf",

        media_type="application/pdf"

    )



