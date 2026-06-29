from prophet import Prophet
import pandas as pd

def forecast_data(
    df,
    date_col,
    target_col,
    periods=6
):

    data = df[[date_col, target_col]].copy()

    data.columns = ["ds", "y"]

    data["ds"] = pd.to_datetime(
        data["ds"]
    )

    model = Prophet()

    model.fit(data)

    future = model.make_future_dataframe(
        periods=periods,
        freq="M"
    )

    forecast = model.predict(future)

    return forecast