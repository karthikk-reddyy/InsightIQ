import pandas as pd

def generate_kpis(df):

    numeric_cols = df.select_dtypes(include="number").columns

    if len(numeric_cols) == 0:
        return {}

    first_numeric = numeric_cols[0]

    return {
        "total": round(df[first_numeric].sum(), 2),
        "average": round(df[first_numeric].mean(), 2),
        "maximum": round(df[first_numeric].max(), 2),
        "minimum": round(df[first_numeric].min(), 2),
        "column": first_numeric
    }