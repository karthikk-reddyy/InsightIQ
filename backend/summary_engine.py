import pandas as pd


def generate_summary(df):

    summary = {
        "rows": len(df),
        "columns": len(df.columns),
        "column_names": list(df.columns),

        "missing_values": int(df.isna().sum().sum()),

        "duplicates": int(df.duplicated().sum()),

        "memory_usage": round(
            df.memory_usage(deep=True).sum() / (1024 * 1024),
            2
        ),

        "numeric_columns": list(
            df.select_dtypes(include="number").columns
        ),

        "categorical_columns": list(
            df.select_dtypes(exclude="number").columns
        ),

        "preview": (
            df.head(10)
            .fillna("")
            .to_dict(orient="records")
        ),

        "statistics": (
            df.describe(include="all")
            .fillna("")
            .to_string()
        )
    }

    return summary