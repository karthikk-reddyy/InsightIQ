import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

import { useDataset } from "../../context/DatasetContext";

const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#9333ea",
    "#0891b2",
    "#ea580c",
    "#7c3aed"
];

function PieChartComponent({ data }) {

    const { xAxis, yAxis } = useDataset();

    if (!data || data.length === 0 || !xAxis || !yAxis)
        return null;

    const grouped = {};

    data.forEach((row) => {

        const category = row[xAxis];

        const value = Number(row[yAxis]);

        if (isNaN(value))
            return;

        if (!grouped[category]) {

            grouped[category] = 0;

        }

        grouped[category] += value;

    });

    const pieData = Object.keys(grouped).map((key) => ({

        name: key,

        value: grouped[key]

    }));

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

                {yAxis} Distribution

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        label
                    >

                        {pieData.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default PieChartComponent;