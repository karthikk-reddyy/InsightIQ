import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { useDataset } from "../../context/DatasetContext";

function ScatterChartComponent({ data }) {
    const { xAxis, yAxis } = useDataset();

    if (!data || data.length === 0 || !xAxis || !yAxis)
        return null;

    const chartData = data.map((row) => ({
        [xAxis]: Number(row[xAxis]),
        [yAxis]: Number(row[yAxis]),
    })).filter(row => !isNaN(row[xAxis]) && !isNaN(row[yAxis]));

    return (
        <div className="w-full bg-transparent flex flex-col items-center">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">
                {yAxis} vs {xAxis} Distribution
            </h2>
            <div className="w-full h-[380px] min-w-[300px] flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                        <XAxis 
                            type="number" 
                            dataKey={xAxis} 
                            name={xAxis} 
                            stroke="#71717a" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis 
                            type="number" 
                            dataKey={yAxis} 
                            name={yAxis} 
                            stroke="#71717a" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dx={-5}
                        />
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3', stroke: '#71717a' }}
                            contentStyle={{
                                backgroundColor: "#18181b",
                                borderColor: "#27272a",
                                borderRadius: "12px",
                                color: "#f4f4f5",
                                fontSize: "13px",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4)"
                            }}
                        />
                        <Scatter name="Dataset" data={chartData} fill="#6366f1" />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ScatterChartComponent;