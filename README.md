# 🚀 InsightIQ – AI Powered Business Intelligence Dashboard

InsightIQ is a full-stack Business Intelligence platform that enables users to upload datasets, generate interactive visualizations, analyze business insights using AI, create professional reports, and forecast future trends. The application combines modern data analytics with AI-powered insights to help users make data-driven decisions quickly.

---

## 📸 Project Preview
- Dashboard
  <img width="945" height="473" alt="Screenshot 2026-07-06 140510" src="https://github.com/user-attachments/assets/c68261b2-8939-4e4e-9438-ca769181b712" />
  <img width="945" height="473" alt="Screenshot 2026-07-06 140510" src="https://github.com/user-attachments/assets/5049cbe5-b6a9-46a1-a38c-0349588f05e2" />

- AI Insights
<img width="955" height="476" alt="Screenshot 2026-07-06 141109" src="https://github.com/user-attachments/assets/b2336652-5821-4110-95a6-d6c54140650c" />
<img width="955" height="476" alt="Screenshot 2026-07-06 141109" src="https://github.com/user-attachments/assets/ac1b7ae8-06d7-41e9-bd45-ebf2caeb3411" />
- Forecasting
<img width="943" height="454" alt="Screenshot 2026-07-06 141318" src="https://github.com/user-attachments/assets/b9431ce2-cff4-4624-9251-9a1138d10751" />

- Reports
  <img width="959" height="475" alt="Screenshot 2026-07-06 141335" src="https://github.com/user-attachments/assets/ac04cc8b-6053-4d13-b1fc-318eb623140e" />

  



---

# ✨ Features

### 📂 Dataset Upload
- Upload CSV and Excel datasets
- Automatic dataset validation
- Instant preview of uploaded data

### 📊 Interactive Dashboard
- KPI Cards
- Dataset Summary
- Missing Values Analysis
- Duplicate Detection
- Memory Usage
- Numeric & Categorical Column Detection

### 📈 Dynamic Data Visualization
- Bar Charts
- Line Charts
- Pie Charts
- Scatter Charts
- Automatic chart generation

### 🤖 AI Powered Analytics
- Executive Summary
- Business Insights
- AI Generated Dataset Summary
- Intelligent Recommendations

### 📑 Reports
- Professional Business Reports
- Executive Summary
- AI Insights
- Charts
- Download Report as PDF

### 📉 Forecasting
- Time Series Forecast
- Future Trend Prediction
- AI Forecast Analysis
- Interactive Forecast Graph

### 📋 Data Preview
- Interactive table
- Filtered dataset preview

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- React Router
- Axios
- Recharts
- Lucide React

## Backend
- FastAPI
- Python
- Pandas
- NumPy
- Scikit-learn

## AI
- OpenAI API (GPT)

## Report Generation
- ReportLab

---

# 📂 Project Structure

```text
InsightIQ
│
├── backend
│   ├── main.py
│   ├── forecast.py
│   ├── report.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │
│   ├── components
│   │   ├── Upload
│   │   ├── Charts
│   │   ├── Reports
│   │   ├── Filters
│   │   ├── Sidebar
│   │   └── Dashboard
│   │
│   ├── pages
│   │   ├── Dashboard.jsx
│   │   ├── Reports.jsx
│   │   └── Forecast.jsx
│   │
│   ├── context
│   ├── services
│   └── App.jsx
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/InsightIQ.git
```

```bash
cd InsightIQ
```

---

## Backend Setup

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
uvicorn main:app --reload
```

Backend runs at

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run React App

```bash
npm run dev
```

Frontend runs at

```text
http://localhost:5173
```

---

# 📊 Workflow

```text
Upload Dataset
        │
        ▼
Data Cleaning
        │
        ▼
Dashboard KPIs
        │
        ▼
Charts & Visualizations
        │
        ▼
AI Business Insights
        │
        ▼
Professional Reports
        │
        ▼
Forecast Future Trends
```

---

# 🎯 Key Highlights

- Full Stack BI Platform
- AI Powered Analytics
- Interactive Dashboard
- Forecasting Module
- Dynamic Charts
- Professional PDF Reports
- Modern React Architecture
- FastAPI REST APIs
- Responsive UI


# 👨‍💻 Author

**Karthik Reddy**

# ⭐ If you like this project

Give this repository a ⭐ on GitHub.
