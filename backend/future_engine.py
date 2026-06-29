from ai_engine import ask_ai


def generate_future_insights(df, question, result):

    prompt = f"""
You are a Senior Business Consultant.

Dataset Columns:
{list(df.columns)}

User Question:
{question}

Analysis Result:
{result}

Based on the analysis, generate ONLY the following:

1. 🔮 Future Prediction
2. ⚠ Potential Risks
3. 💡 Business Recommendations
4. 📌 Next KPIs to Monitor

Keep the answer concise (maximum 250 words).

Use bullet points.
"""

    try:

        response = ask_ai(
            prompt,
            ""
        )

        return response

    except Exception:

        return """
### 🔮 Future Prediction

Unable to generate future insights.

Please try again.
"""