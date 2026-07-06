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
            <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    Forecasting
                </h1>
                <p className="text-sm font-medium text-zinc-500 tracking-wide mt-4 max-w-sm">
                    Upload a dataset first.
                </p>
            </div>
        );
    }

    const growth = forecast.length > 1
        ? ((forecast[forecast.length - 1].prediction - forecast[0].prediction) / forecast[0].prediction) * 100
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
        } catch (err) {
            console.log(err);
            alert("Forecast generation failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 p-6 space-y-6 antialiased">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Header Layout */}
                <div className="w-full flex flex-col items-start justify-start border-b border-zinc-900 pb-5">
                    <h1 className="text-2xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-2">
                        <span>📈</span> Sales Forecasting
                    </h1>
                    <p className="text-xs font-medium text-zinc-500 tracking-wide mt-1.5">
                        Predict future business performance metrics using automated machine learning models.
                    </p>
                </div>

                {/* Input Configuration Box */}
                <div className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl p-6 shadow-xl flex flex-col">
                    <div className="grid md:grid-cols-2 gap-6 w-full text-left">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Forecast Target Column
                            </label>
                            <select
                                className="w-full bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-xl p-3.5 mt-2 outline-none font-medium text-sm transition-all focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 cursor-pointer"
                                value={column}
                                onChange={(e) => setColumn(e.target.value)}
                            >
                                <option value="" className="bg-zinc-900">Select Target Parameter</option>
                                {datasetInfo.numeric_columns.map(col => (
                                    <option key={col} value={col} className="bg-zinc-900">{col}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Forecast Horizon (Days)
                            </label>
                            <input
                                type="number"
                                className="w-full bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-xl p-3.5 mt-2 outline-none font-medium text-sm transition-all focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 placeholder-zinc-700"
                                value={periods}
                                onChange={(e) => setPeriods(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        onClick={generateForecast}
                        className={`mt-6 w-full px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center ${
                            loading
                                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700"
                                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-950"
                        }`}
                    >
                        {loading ? "⏳ Computing Predictive Models..." : "Generate Forecast"}
                    </button>
                </div>

                {/* KPI Cards Layer */}
                {forecast.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-md">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Average Prediction</p>
                            <p className="text-xl font-extrabold text-indigo-400">
                                ₹{(forecast.reduce((sum, item) => sum + item.prediction, 0) / forecast.length).toFixed(0)}
                            </p>
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-md">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Maximum Prediction</p>
                            <p className="text-xl font-extrabold text-emerald-400">
                                ₹{Math.max(...forecast.map(item => item.prediction)).toFixed(0)}
                            </p>
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-md">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Minimum Prediction</p>
                            <p className="text-xl font-extrabold text-rose-400">
                                ₹{Math.min(...forecast.map(item => item.prediction)).toFixed(0)}
                            </p>
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-md">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Expected Growth</p>
                            <p className="text-xl font-extrabold text-purple-400">
                                {growth.toFixed(2)}%
                            </p>
                        </div>
                    </div>
                )}

                {/* Placeholder Preview Screen */}
                {forecast.length === 0 && !loading && (
                    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center shadow-md">
                        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
                            <span>📉</span> Forecast Preview
                        </h2>
                        <p className="text-xs text-zinc-500 font-medium tracking-wide max-w-sm mx-auto leading-relaxed">
                            Select a numeric target parameter data layout window and evaluate structural metrics to populate ML analysis blocks.
                        </p>
                    </div>
                )}

                {/* Line Trend Visualization Component */}
                {forecast.length > 0 && (
                    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 text-center mb-6">
                            Forecast Trend Metrics
                        </h2>
                        
                        <div className="w-full h-[380px] min-w-[300px] flex justify-center items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={forecast} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                    <XAxis 
                                        dataKey="date" 
                                        stroke="#71717a" 
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                    />
                                    <YAxis 
                                        stroke="#71717a" 
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        dx={-5}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#18181b",
                                            borderColor: "#27272a",
                                            borderRadius: "12px",
                                            color: "#f4f4f5",
                                            fontSize: "13px",
                                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4)"
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="prediction"
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 5, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Horizontal Grid Info Splitting */}
                {forecast.length > 0 && (
                    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 text-left mb-4">
                            Forecast Summary
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-4 text-left shadow-inner">
                                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Forecast Horizon</h3>
                                <p className="text-base font-bold text-indigo-400">{periods} Days</p>
                            </div>
                            <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-4 text-left shadow-inner">
                                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Forecast Records</h3>
                                <p className="text-base font-bold text-emerald-400">{forecast.length}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* AI Generated Response Text Area Block */}
                {aiAnalysis && (
                    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 text-center mb-5 w-full flex items-center justify-center gap-2">
                            <span>🤖</span> AI Business Insights
                        </h2>
                        <div className="w-full bg-zinc-950/40 border border-zinc-800 rounded-xl p-5 text-left shadow-inner">
                            <p className="whitespace-pre-wrap leading-7 text-xs font-medium text-zinc-400">
                                {aiAnalysis}
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Forecast;