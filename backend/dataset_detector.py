def detect_dataset(df):

    columns = [col.lower() for col in df.columns]

    if "sales" in columns:
        return "Sales Dataset"

    elif "employee" in columns:
        return "HR Dataset"

    elif "customer" in columns:
        return "Customer Dataset"

    return "Generic Dataset"