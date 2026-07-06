import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";
import { useDataset } from "../../context/DatasetContext";

function PieChartComponent({ data }) {
    const { xAxis, yAxis } = useDataset();

    if (!data || data.length === 0 || !xAxis || !yAxis)
        return null;

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
        name: key,
        value: grouped[key]
    }));

    // Premium dark-themed visual array palette
    const COLORS = ["#6366f1", "#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"];

    return (
        <div className="w-full bg-transparent flex flex-col items-center">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">
                {yAxis} Share by {xAxis}
            </h2>
            <div className="w-full h-[380px] min-w-[300px] flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
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
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="45%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={4}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#18181b" strokeWidth={2} />
                            ))}
                        </Pie>
                        <Legend 
                            verticalAlign="bottom" 
                            height={36} 
                            iconType="circle"
                            wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default PieChartComponent;