import pandas as pd


def format_result(result, intent):

    if result is None:
        return "No result found."

    operation = intent.get("operation", "").lower()

    metric = intent.get("metric", "")

    group = intent.get("groupby", "")

    # ===================================
    # Simple Values
    # ===================================

    if isinstance(result, (int, float, str)):

        if operation == "count":
            return f"""
### 📊 Total Records

**{result:,}**
"""

        if operation == "sum":
            return f"""
### 💰 Total {metric}

**{result:,.2f}**
"""

        if operation == "average":
            return f"""
### 📈 Average {metric}

**{result:,.2f}**
"""

        return str(result)

    # ===================================
    # Dictionary
    # ===================================

    if isinstance(result, dict):

        text = "## 🏆 Analysis Result\n\n"

        for k, v in result.items():

            text += f"**{k} :** {v}\n\n"

        return text

    # ===================================
    # List of dictionaries
    # ===================================

    if isinstance(result, list):

        df = pd.DataFrame(result)

        return df

    return result


# ===================================
# BUSINESS INSIGHT
# ===================================

def generate_business_insight(intent):

    operation = intent.get("operation", "")

    metric = intent.get("metric", "")

    group = intent.get("groupby", "")

    if operation == "highest":

        return f"""
📈 **Business Insight**

The highest **{metric}** indicates the best-performing {group}.

This segment contributes significantly to business performance and should be analyzed for best practices.
"""

    if operation == "lowest":

        return f"""
📉 **Business Insight**

The lowest **{metric}** highlights an underperforming {group}.

Investigating this area may reveal operational or strategic improvements.
"""

    if operation == "average":

        return f"""
📊 **Business Insight**

The average **{metric}** provides a benchmark for comparing future performance.
"""

    if operation == "sum":

        return f"""
💰 **Business Insight**

The total **{metric}** reflects the overall business volume for the selected data.
"""

    if operation == "trend":

        return """
📈 **Business Insight**

Trend analysis helps identify seasonal patterns, growth opportunities, and anomalies over time.
"""

    return """
📊 **Business Insight**

The analysis has been completed successfully.
"""


# ===================================
# FUTURE RECOMMENDATION
# ===================================

def generate_recommendation(intent):

    operation = intent.get("operation", "")

    metric = intent.get("metric", "")

    group = intent.get("groupby", "")

    if operation == "highest":

        return f"""
💡 **Recommendation**

• Increase investment in the top-performing **{group}**.

• Study why this segment performs well.

• Replicate successful strategies across other groups.
"""

    if operation == "lowest":

        return f"""
💡 **Recommendation**

• Investigate the reasons for low **{metric}**.

• Consider targeted marketing or operational improvements.

• Compare with top-performing groups to identify gaps.
"""

    if operation == "trend":

        return """
💡 **Recommendation**

• Monitor future trends regularly.

• Forecast demand.

• Prepare inventory and workforce accordingly.
"""

    return """
💡 **Recommendation**

Continue monitoring KPIs and review performance periodically for better decision-making.
"""