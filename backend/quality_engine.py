import pandas as pd

def calculate_quality_score(df):

    total_cells = df.shape[0] * df.shape[1]

    missing = df.isnull().sum().sum()

    duplicates = df.duplicated().sum()

    missing_percent = (missing / total_cells) * 100 if total_cells else 0

    duplicate_percent = (duplicates / len(df)) * 100 if len(df) else 0

    score = 100

    score -= missing_percent * 0.5
    score -= duplicate_percent * 0.5

    score = max(0, round(score, 2))

    return {
        "score": score,
        "missing_values": int(missing),
        "duplicates": int(duplicates)
    }