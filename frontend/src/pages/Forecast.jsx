import { useState } from "react";
import { useDataset } from "../context/DatasetContext";
import API from "../services/api";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function Forecast() {

    const { datasetInfo } = useDataset();

    const [column, setColumn] = useState("");

    const [periods, setPeriods] = useState(30);

    const [forecast, setForecast] = useState([]);

    const [aiAnalysis, setAIAnalysis] = useState("");

    const [loading, setLoading] = useState(false);

    if (!datasetInfo) {
        return (
            <div className="text-center mt-20">
                <h1 className="text-3xl font-bold">
                    Forecasting
                </h1>

                <p className="text-gray-500 mt-4">
                    Upload a dataset first from Dashboard.
                </p>
            </div>
        );
    }

    // ==============================
    // Generate Forecast
    // ==============================

    const generateForecast = async () => {

        if (column === "") {
            alert("Select a numeric column");
            return;
        }

        try {

            setLoading(true);

            const response = await API.post("/forecast", {

                column,

                periods: Number(periods)

            });

            console.log(response.data);

            setForecast(response.data.forecast);

            setAIAnalysis(response.data.ai_analysis);

        }

        catch (err) {

            console.log(err);

            alert("Forecast Failed");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <h1 className="text-3xl font-bold">
                Sales Forecasting
            </h1>

            <p className="text-gray-500 mt-2">
                Predict future values using AI.
            </p>

            <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

                <div className="grid grid-cols-2 gap-6">

                    <div>

                        <label className="font-semibold">
                            Select Numeric Column
                        </label>

                        <select
                            className="w-full border rounded-xl p-3 mt-2"
                            value={column}
                            onChange={(e)=>setColumn(e.target.value)}
                        >

                            <option value="">
                                Select
                            </option>

                            {datasetInfo.numeric_columns.map(col=>(

                                <option key={col} value={col}>

                                    {col}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="font-semibold">
                            Forecast Days
                        </label>

                        <input
                            type="number"
                            className="w-full border rounded-xl p-3 mt-2"
                            value={periods}
                            onChange={(e)=>setPeriods(e.target.value)}
                        />

                    </div>

                </div>

                <button

                    onClick={generateForecast}

                    className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl"

                >

                    {loading ? "Generating..." : "Generate Forecast"}

                </button>

            </div>
            {forecast.length > 0 && (

<div className="grid grid-cols-3 gap-6 mt-8">

    <div className="bg-white rounded-xl shadow-lg p-6">

        <h3 className="text-gray-500">
            Average Prediction
        </h3>

        <p className="text-3xl font-bold mt-2 text-blue-600">

            ₹{
                (
                    forecast.reduce((sum, item) => sum + item.prediction, 0)
                    / forecast.length
                ).toFixed(0)
            }

        </p>

    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">

        <h3 className="text-gray-500">
            Maximum Prediction
        </h3>

        <p className="text-3xl font-bold mt-2 text-green-600">

            ₹{
                Math.max(...forecast.map(item => item.prediction)).toFixed(0)
            }

        </p>

    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">

        <h3 className="text-gray-500">
            Minimum Prediction
        </h3>

        <p className="text-3xl font-bold mt-2 text-red-600">

            ₹{
                Math.min(...forecast.map(item => item.prediction)).toFixed(0)
            }

        </p>

    </div>

</div>

)}

            {/* Forecast Table */}

           {forecast.length > 0 && (

<div className="bg-white rounded-2xl shadow-lg mt-8 p-6">

    <h2 className="text-2xl font-bold mb-6">

        Sales Forecast

    </h2>

    <ResponsiveContainer
        width="100%"
        height={450}
    >

        <LineChart
            data={forecast}
        >

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis
                dataKey="date"
            />

            <YAxis/>

            <Tooltip/>

            <Line
                type="monotone"
                dataKey="prediction"
                stroke="#2563eb"
                strokeWidth={3}
            />

        </LineChart>

    </ResponsiveContainer>

</div>

)}
{aiAnalysis && (

<div className="bg-white rounded-2xl shadow-lg mt-8 p-6">

    <h2 className="text-2xl font-bold mb-5">

        🤖 AI Forecast Analysis

    </h2>

    <div className="bg-blue-50 rounded-xl p-5">

        <p className="whitespace-pre-wrap text-gray-700 leading-8">

            {aiAnalysis}

        </p>

    </div>

</div>

)}

            

        </div>

    );

}

export default Forecast;
