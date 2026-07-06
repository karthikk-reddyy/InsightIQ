import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { useDataset } from "../../context/DatasetContext";

function LineChartComponent({ data }) {
    const { xAxis, yAxis } = useDataset();

    if (!data || data.length === 0 || !xAxis || !yAxis)
        return null;

    // Maintain your exact mapping logic
    const grouped = {};
    data.forEach((row) => {
        const category = row[xAxis];
        const value = Number(row[yAxis]);
        if (isNaN(value)) return;
        if (!grouped[category]) {
            grouped[category] = 0;
        }
        grouped[category] += value;
    });

    const chartData = Object.keys(grouped).map((key) => ({
        [xAxis]: key,
        [yAxis]: grouped[key]
    }));

    return (
        <div className="w-full bg-transparent flex flex-col items-center">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">
                {yAxis} Trend by {xAxis}
            </h2>
            <div className="w-full h-[380px] min-w-[300px] flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis 
                            dataKey={xAxis} 
                            stroke="#71717a" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis 
                            stroke="#71717a" 
                            fontSize={12}
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
                            dataKey={yAxis}
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default LineChartComponent;