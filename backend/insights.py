def generate_insights(df):

    insights = []

    numeric_cols = df.select_dtypes(
        include="number"
    ).columns

    for col in numeric_cols:

        insights.append(
            f"{col} Average = {round(df[col].mean(),2)}"
        )

        insights.append(
            f"{col} Maximum = {df[col].max()}"
        )

        insights.append(
            f"{col} Minimum = {df[col].min()}"
        )

    return insights