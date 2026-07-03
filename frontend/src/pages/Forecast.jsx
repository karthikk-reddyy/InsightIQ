import { useState } from "react";
import { useDataset } from "../context/DatasetContext";
import API from "../services/api";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
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

                    Upload a dataset first.

                </p>

            </div>

        );

    }

    const growth =

        forecast.length > 1

            ? (

                (

                    forecast[forecast.length - 1].prediction -

                    forecast[0].prediction

                )

                /

                forecast[0].prediction

            ) * 100

            : 0;

    const generateForecast = async () => {

        if (!column) {

            alert("Select a numeric column");

            return;

        }

        try {

            setLoading(true);

            const response = await API.post("/forecast", {

                column,

                periods: Number(periods)

            });

            setForecast(response.data.forecast);

            setAIAnalysis(response.data.ai_analysis);

        }

        catch (err) {

            console.log(err);

            alert("Forecast generation failed.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">

                    📈 Sales Forecasting

                </h1>

                <p className="text-gray-500 mt-2">

                    Predict future business performance using AI.

                </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <label className="font-semibold">

                            Forecast Column

                        </label>

                        <select

                            className="w-full border rounded-xl p-3 mt-2"

                            value={column}

                            onChange={(e)=>setColumn(e.target.value)}

                        >

                            <option value="">

                                Select Column

                            </option>

                            {datasetInfo.numeric_columns.map(col=>(

                                <option

                                    key={col}

                                    value={col}

                                >

                                    {col}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Forecast Horizon

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

                    disabled={loading}

                    onClick={generateForecast}

                    className={`

                        mt-8

                        px-8

                        py-3

                        rounded-xl

                        text-white

                        ${loading

                            ? "bg-gray-400 cursor-not-allowed"

                            : "bg-blue-600 hover:bg-blue-700"}

                    `}

                >

                    {loading

                        ? "⏳ Generating Forecast..."

                        : "Generate Forecast"}

                </button>

            </div>

            {forecast.length > 0 && (

                <div className="grid lg:grid-cols-4 gap-6">

                    <div className="bg-white rounded-xl shadow-lg p-6">

                        <h3 className="text-gray-500">

                            Average Prediction

                        </h3>

                        <p className="text-3xl font-bold text-blue-600 mt-3">

                            ₹{

                                (

                                    forecast.reduce(

                                        (sum,item)=>sum+item.prediction,

                                        0

                                    )

                                    /

                                    forecast.length

                                ).toFixed(0)

                            }

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">

                        <h3 className="text-gray-500">

                            Maximum Prediction

                        </h3>

                        <p className="text-3xl font-bold text-green-600 mt-3">

                            ₹{

                                Math.max(

                                    ...forecast.map(

                                        item=>item.prediction

                                    )

                                ).toFixed(0)

                            }

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">

                        <h3 className="text-gray-500">

                            Minimum Prediction

                        </h3>

                        <p className="text-3xl font-bold text-red-600 mt-3">

                            ₹{

                                Math.min(

                                    ...forecast.map(

                                        item=>item.prediction

                                    )

                                ).toFixed(0)

                            }

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">

                        <h3 className="text-gray-500">

                            Expected Growth

                        </h3>

                        <p className="text-3xl font-bold text-purple-600 mt-3">

                            {growth.toFixed(2)}%

                        </p>

                    </div>

                </div>

            )}
                        {forecast.length === 0 && !loading && (

                <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

                    <h2 className="text-2xl font-bold">

                        📈 Forecast Preview

                    </h2>

                    <p className="text-gray-500 mt-4">

                        Select a numeric column and generate a forecast to visualize future trends.

                    </p>

                </div>

            )}

            {forecast.length > 0 && (

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold mb-6">

                        Forecast Trend

                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={450}
                    >

                        <LineChart
                            data={forecast}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
                                dataKey="date"
                            />

                            <YAxis />

                            <Tooltip />

                            <Line

                                type="monotone"

                                dataKey="prediction"

                                stroke="#2563eb"

                                strokeWidth={4}

                                dot={false}

                                activeDot={{ r: 6 }}

                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            )}

            {forecast.length > 0 && (

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold mb-6">

                        Forecast Summary

                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div className="bg-gray-50 rounded-xl p-5">

                            <h3 className="font-semibold">

                                Forecast Horizon

                            </h3>

                            <p className="text-3xl font-bold mt-2 text-blue-600">

                                {periods} Days

                            </p>

                        </div>

                        <div className="bg-gray-50 rounded-xl p-5">

                            <h3 className="font-semibold">

                                Forecast Records

                            </h3>

                            <p className="text-3xl font-bold mt-2 text-green-600">

                                {forecast.length}

                            </p>

                        </div>

                    </div>

                </div>

            )}

            {aiAnalysis && (

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold mb-6">

                        🤖 AI Business Insights

                    </h2>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">

                        <p className="whitespace-pre-wrap leading-8 text-gray-700">

                            {aiAnalysis}

                        </p>

                    </div>

                </div>

            )}

        </div>

    );

}

export default Forecast;