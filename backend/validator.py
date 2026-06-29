import difflib


# ============================================
# Find Closest Matching Column
# ============================================

def find_best_match(name, columns):

    if not name:
        return ""

    # Exact Match
    for col in columns:

        if col.lower() == name.lower():

            return col

    # Partial Match
    for col in columns:

        if name.lower() in col.lower():

            return col

    # Fuzzy Match
    match = difflib.get_close_matches(
        name,
        columns,
        n=1,
        cutoff=0.5
    )

    if match:

        return match[0]

    return ""


# ============================================
# Validate Intent
# ============================================

def validate_intent(intent, df):

    columns = list(df.columns)

    validated = intent.copy()

    # -----------------------------
    # Validate Metric
    # -----------------------------

    if validated["metric"]:

        validated["metric"] = find_best_match(
            validated["metric"],
            columns
        )

    # -----------------------------
    # Validate GroupBy
    # -----------------------------

    if validated["groupby"]:

        validated["groupby"] = find_best_match(
            validated["groupby"],
            columns
        )

    # -----------------------------
    # Validate Filters
    # -----------------------------

    new_filters = {}

    for key, value in validated["filter"].items():

        new_key = find_best_match(
            key,
            columns
        )

        if new_key:

            new_filters[new_key] = value

    validated["filter"] = new_filters

    # -----------------------------
    # Validate Aggregation
    # -----------------------------

    allowed = [

        "sum",
        "mean",
        "count",
        "max",
        "min"

    ]

    if validated["aggregation"] not in allowed:

        validated["aggregation"] = ""

    # -----------------------------
    # Validate Sort
    # -----------------------------

    if validated["sort"] not in [

        "asc",

        "desc",

        ""

    ]:

        validated["sort"] = ""

    # -----------------------------
    # Validate Limit
    # -----------------------------

    try:

        validated["limit"] = int(

            validated["limit"]

        )

    except:

        validated["limit"] = 0

    return validated