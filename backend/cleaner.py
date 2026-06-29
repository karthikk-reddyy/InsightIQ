import pandas as pd

def clean_data(df):

    original_rows = len(df)

    duplicates_removed = df.duplicated().sum()

    df = df.drop_duplicates()

    numeric_cols = df.select_dtypes(include=["number"]).columns

    for col in numeric_cols:
        df[col] = df[col].fillna(df[col].median())

    object_cols = df.select_dtypes(include=["object"]).columns

    for col in object_cols:

        if not df[col].mode().empty:
            df[col] = df[col].fillna(
                df[col].mode()[0]
            )

    report = {
        "original_rows": original_rows,
        "duplicates_removed": int(duplicates_removed),
        "final_rows": len(df)
    }

    return df, report