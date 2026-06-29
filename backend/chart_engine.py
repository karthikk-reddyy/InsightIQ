import plotly.express as px


def generate_chart(df, question):

    q = question.lower()

    numeric_cols = df.select_dtypes(include="number").columns

    categorical_cols = df.select_dtypes(
        exclude="number"
    ).columns

    # BAR CHART

    if (
        "by" in q
        and len(numeric_cols) > 0
        and len(categorical_cols) > 0
    ):

        y_col = numeric_cols[0]
        x_col = categorical_cols[0]

        fig = px.bar(
            df,
            x=x_col,
            y=y_col,
            title=f"{y_col} by {x_col}"
        )

        return fig

    # HISTOGRAM

    if (
        "distribution" in q
        and len(numeric_cols) > 0
    ):

        fig = px.histogram(
            df,
            x=numeric_cols[0],
            title=f"{numeric_cols[0]} Distribution"
        )

        return fig

    # SCATTER

    if len(numeric_cols) >= 2:

        if (
            "correlation" in q
            or "relationship" in q
        ):

            fig = px.scatter(
                df,
                x=numeric_cols[0],
                y=numeric_cols[1],
                title="Relationship Analysis"
            )

            return fig

    return None