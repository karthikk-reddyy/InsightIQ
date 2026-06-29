import pandas as pd


def process_query(df, question):

    q = question.lower()

    numeric_cols = list(
        df.select_dtypes(include="number").columns
    )

    text_cols = list(
        df.select_dtypes(exclude="number").columns
    )

    # ==================================
    # TOTAL RECORDS
    # ==================================

    if (
        "count" in q
        or "how many rows" in q
        or "total records" in q
    ):

        return {
            "answer":
            f"Total Records: {len(df)}"
        }

    # ==================================
    # UNIQUE VALUES
    # ==================================

    if "unique" in q:

        for col in df.columns:

            if col.lower() in q:

                return {
                    "answer":
                    f"{col} has {df[col].nunique()} unique values"
                }

    # ==================================
    # AVERAGE
    # ==================================

    if (
        "average" in q
        or "mean" in q
    ):

        for col in numeric_cols:

            if col.lower() in q:

                avg = round(
                    df[col].mean(),
                    2
                )

                return {
                    "answer":
                    f"Average {col}: {avg}"
                }

    # ==================================
    # TOTAL / SUM
    # ==================================

    if (
        "total" in q
        or "sum" in q
    ):

        for col in numeric_cols:

            if col.lower() in q:

                total = round(
                    df[col].sum(),
                    2
                )

                return {
                    "answer":
                    f"Total {col}: {total}"
                }

    # ==================================
    # HIGHEST
    # ==================================

    if (
        "highest" in q
        or "maximum" in q
        or "max" in q
    ):

        # find metric column

        metric_col = None

        for col in numeric_cols:

            if col.lower() in q:

                metric_col = col
                break

        # find group column

        group_col = None

        for col in text_cols:

            if col.lower() in q:

                group_col = col
                break

        # Region + Sales type questions

        if metric_col and group_col:

            grouped = (
                df.groupby(group_col)[metric_col]
                .sum()
                .reset_index()
            )

            winner = grouped.loc[
                grouped[metric_col].idxmax()
            ]

            return {
                "answer":
                f"{winner[group_col]} has highest {metric_col} ({winner[metric_col]})"
            }

        # simple max

        elif metric_col:

            idx = df[metric_col].idxmax()

            return {
                "answer":
                df.loc[idx].to_string()
            }

    # ==================================
    # LOWEST
    # ==================================

    if (
        "lowest" in q
        or "minimum" in q
        or "min" in q
    ):

        metric_col = None

        for col in numeric_cols:

            if col.lower() in q:

                metric_col = col
                break

        if metric_col:

            idx = df[metric_col].idxmin()

            return {
                "answer":
                df.loc[idx].to_string()
            }

    # ==================================
    # TOP 5
    # ==================================

    if "top 5" in q:

        for col in numeric_cols:

            if col.lower() in q:

                top = df.nlargest(
                    5,
                    col
                )

                return {
                    "answer":
                    top.to_string()
                }

    # ==================================
    # TOP 10
    # ==================================

    if "top 10" in q:

        for col in numeric_cols:

            if col.lower() in q:

                top = df.nlargest(
                    10,
                    col
                )

                return {
                    "answer":
                    top.to_string()
                }

    # ==================================
    # GROUP BY
    # ==================================

    if "by" in q:

        group_col = None
        metric_col = None

        for col in text_cols:

            if col.lower() in q:

                group_col = col

        for col in numeric_cols:

            if col.lower() in q:

                metric_col = col

        if group_col and metric_col:

            result = (
                df.groupby(group_col)[metric_col]
                .sum()
                .sort_values(
                    ascending=False
                )
            )

            return {
                "answer":
                result.head(10).to_string()
            }

    return None