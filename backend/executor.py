import pandas as pd
import difflib


# =====================================================
# FIND BEST MATCHING COLUMN
# =====================================================

def find_best_column(df, column_name):

    if not column_name:
        return None

    columns = list(df.columns)

    # Exact match
    for col in columns:
        if col.lower() == column_name.lower():
            return col

    # Partial match
    for col in columns:
        if column_name.lower() in col.lower():
            return col

    # Fuzzy match
    match = difflib.get_close_matches(
        column_name,
        columns,
        n=1,
        cutoff=0.5
    )

    if match:
        return match[0]

    return None


# =====================================================
# APPLY FILTERS
# =====================================================

def apply_filters(df, filters):

    if not filters:
        return df

    filtered = df.copy()

    for column, value in filters.items():

        actual_col = find_best_column(
            filtered,
            column
        )

        if actual_col is None:
            continue

        # Numeric Filter
        if pd.api.types.is_numeric_dtype(
            filtered[actual_col]
        ):

            try:

                value = float(value)

                filtered = filtered[
                    filtered[actual_col] == value
                ]

                continue

            except:
                pass

        # String Filter
        filtered = filtered[
            filtered[actual_col]
            .astype(str)
            .str.lower()
            .str.contains(
                str(value).lower(),
                na=False
            )
        ]

    return filtered


# =====================================================
# COUNT
# =====================================================

def execute_count(df):

    return {

        "answer":
        f"Total Records Found : {len(df)}"
    }


# =====================================================
# SUM
# =====================================================

def execute_sum(df, metric):

    metric = find_best_column(
        df,
        metric
    )

    if metric is None:

        return {
            "answer":
            "Metric column not found."
        }

    total = df[metric].sum()

    return {

        "answer":

        round(total, 2)
    }


# =====================================================
# AVERAGE
# =====================================================

def execute_average(df, metric):

    metric = find_best_column(
        df,
        metric
    )

    if metric is None:

        return {

            "answer":
            "Metric column not found."
        }

    avg = df[metric].mean()

    return {

        "answer":

        round(avg, 2)
    }


# =====================================================
# HIGHEST
# =====================================================

def execute_highest(df, metric):

    metric = find_best_column(
        df,
        metric
    )

    if metric is None:

        return {

            "answer":
            "Metric column not found."
        }

    idx = df[metric].idxmax()

    row = df.loc[idx]

    return {

        "answer":

        row.to_dict()
    }


# =====================================================
# LOWEST
# =====================================================

def execute_lowest(df, metric):

    metric = find_best_column(
        df,
        metric
    )

    if metric is None:

        return {

            "answer":
            "Metric column not found."
        }

    idx = df[metric].idxmin()

    row = df.loc[idx]

    return {

        "answer":

        row.to_dict()
    }
# =====================================================
# TOP N
# =====================================================

def execute_top(df, metric, n=5):

    metric = find_best_column(df, metric)

    if metric is None:
        return {
            "answer": "Metric column not found."
        }

    try:

        top = df.nlargest(n, metric)

        return {
            "answer": top.to_dict("records")
        }

    except Exception as e:

        return {
            "answer": str(e)
        }


# =====================================================
# BOTTOM N
# =====================================================

def execute_bottom(df, metric, n=5):

    metric = find_best_column(df, metric)

    if metric is None:
        return {
            "answer": "Metric column not found."
        }

    try:

        bottom = df.nsmallest(n, metric)

        return {
            "answer": bottom.to_dict("records")
        }

    except Exception as e:

        return {
            "answer": str(e)
        }


# =====================================================
# UNIQUE VALUES
# =====================================================

def execute_unique(df, column):

    column = find_best_column(df, column)

    if column is None:

        return {
            "answer": "Column not found."
        }

    values = df[column].dropna().unique().tolist()

    return {

        "answer": values,

        "count": len(values)
    }


# =====================================================
# MISSING VALUES
# =====================================================

def execute_missing(df):

    missing = df.isnull().sum()

    missing = missing[missing > 0]

    return {

        "answer":

        missing.to_dict()
    }


# =====================================================
# DUPLICATES
# =====================================================

def execute_duplicates(df):

    duplicates = int(df.duplicated().sum())

    return {

        "answer":

        duplicates
    }


# =====================================================
# GROUP BY
# =====================================================

def execute_groupby(df, group_col, metric, operation="sum"):

    group_col = find_best_column(df, group_col)
    metric = find_best_column(df, metric)

    if group_col is None:

        return {
            "answer": "Group column not found."
        }

    if metric is None:

        return {
            "answer": "Metric column not found."
        }

    try:

        grouped = df.groupby(group_col)[metric]

        operation = operation.lower()

        if operation == "sum":

            result = grouped.sum()

        elif operation == "average":

            result = grouped.mean()

        elif operation == "mean":

            result = grouped.mean()

        elif operation == "count":

            result = grouped.count()

        elif operation == "max":

            result = grouped.max()

        elif operation == "min":

            result = grouped.min()

        else:

            result = grouped.sum()

        result = result.sort_values(
            ascending=False
        )

        return {

            "answer":

            result.reset_index().to_dict(
                "records"
            )
        }

    except Exception as e:

        return {

            "answer":

            str(e)
        }
# =====================================================
# FIND CATEGORICAL COLUMNS
# =====================================================

def get_categorical_columns(df):

    cols = []

    for col in df.columns:

        if not pd.api.types.is_numeric_dtype(df[col]):
            cols.append(col)

    return cols


# =====================================================
# FIND NUMERIC COLUMNS
# =====================================================

def get_numeric_columns(df):

    cols = []

    for col in df.columns:

        if pd.api.types.is_numeric_dtype(df[col]):
            cols.append(col)

    return cols


# =====================================================
# AUTOMATIC GROUP COLUMN DETECTION
# =====================================================

def detect_group_column(df, question):

    question = question.lower()

    categorical = get_categorical_columns(df)

    for col in categorical:

        if col.lower() in question:
            return col

    return None


# =====================================================
# AUTOMATIC METRIC DETECTION
# =====================================================

def detect_metric(df, question):

    question = question.lower()

    numeric = get_numeric_columns(df)

    for col in numeric:

        if col.lower() in question:
            return col

    return None


# =====================================================
# DETECT DATE COLUMN
# =====================================================

def detect_date_column(df):

    for col in df.columns:

        try:

            sample = pd.to_datetime(
                df[col].dropna().head(20),
                errors="raise"
            )

            return col

        except:
            pass

    return None


# =====================================================
# SALES BY REGION
# PROFIT BY CATEGORY
# ETC.
# =====================================================

def execute_auto_groupby(df, question):

    metric = detect_metric(df, question)

    group = detect_group_column(df, question)

    if metric is None:
        return None

    if group is None:

        categorical = get_categorical_columns(df)

        if len(categorical) == 0:
            return None

        group = categorical[0]

    result = (

        df.groupby(group)[metric]

        .sum()

        .sort_values(
            ascending=False
        )

        .reset_index()

    )

    return {

        "answer": result.to_dict("records")
    }


# =====================================================
# HIGHEST GROUP
# =====================================================

def execute_highest_group(df, question):

    metric = detect_metric(df, question)

    group = detect_group_column(df, question)

    if metric is None:
        return None

    if group is None:

        categorical = get_categorical_columns(df)

        if len(categorical) == 0:
            return None

        group = categorical[0]

    result = (

        df.groupby(group)[metric]

        .sum()

        .idxmax()

    )

    return {

        "answer":

        result
    }


# =====================================================
# LOWEST GROUP
# =====================================================

def execute_lowest_group(df, question):

    metric = detect_metric(df, question)

    group = detect_group_column(df, question)

    if metric is None:
        return None

    if group is None:

        categorical = get_categorical_columns(df)

        if len(categorical) == 0:
            return None

        group = categorical[0]

    result = (

        df.groupby(group)[metric]

        .sum()

        .idxmin()

    )

    return {

        "answer":

        result
    }


# =====================================================
# TREND ANALYSIS
# =====================================================

def execute_trend(df, question):

    metric = detect_metric(df, question)

    date = detect_date_column(df)

    if metric is None:
        return None

    if date is None:
        return None

    temp = df.copy()

    temp[date] = pd.to_datetime(
        temp[date]
    )

    temp = temp.sort_values(date)

    trend = (

        temp.groupby(date)[metric]

        .sum()

        .reset_index()

    )

    return {

        "answer":

        trend.to_dict("records")
    }
def execute_query(df, intent):

    operation = intent.get("operation", "").lower()
    metric = intent.get("metric", "")
    groupby = intent.get("groupby", "")
    aggregation = intent.get("aggregation", "")
    filters = intent.get("filter", {})
    limit = intent.get("limit", 5)

    # -------------------------
    # Apply Filters
    # -------------------------

    df = apply_filters(df, filters)

    # -------------------------
    # Count
    # -------------------------

    if operation == "count":
        return execute_count(df)

    # -------------------------
    # Sum
    # -------------------------

    elif operation == "sum":
        return execute_sum(df, metric)

    # -------------------------
    # Average
    # -------------------------

    elif operation == "average":
        return execute_average(df, metric)

    # -------------------------
    # Highest
    # -------------------------

    elif operation == "highest":

        if groupby:
            return execute_groupby(
                df,
                groupby,
                metric,
                aggregation or "sum"
            )

        return execute_highest(df, metric)

    # -------------------------
    # Lowest
    # -------------------------

    elif operation == "lowest":

        if groupby:
            return execute_groupby(
                df,
                groupby,
                metric,
                aggregation or "sum"
            )

        return execute_lowest(df, metric)

    # -------------------------
    # Top
    # -------------------------

    elif operation == "top":
        return execute_top(df, metric, limit)

    # -------------------------
    # Bottom
    # -------------------------

    elif operation == "bottom":
        return execute_bottom(df, metric, limit)

    # -------------------------
    # Unique
    # -------------------------

    elif operation == "unique":
        return execute_unique(df, metric)

    # -------------------------
    # Missing
    # -------------------------

    elif operation == "missing":
        return execute_missing(df)

    # -------------------------
    # Duplicate
    # -------------------------

    elif operation == "duplicate":
        return execute_duplicates(df)

    # -------------------------
    # Trend
    # -------------------------

    elif operation == "trend":
        return execute_trend(df, metric)

    # -------------------------
    # Default GroupBy
    # -------------------------

    elif groupby:
        return execute_groupby(
            df,
            groupby,
            metric,
            aggregation or "sum"
        )

    return {
        "answer": "Sorry, I couldn't understand the question."
    }