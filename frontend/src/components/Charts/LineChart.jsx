import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import { useDataset } from "../../context/DatasetContext";

function LineChartComponent({ data }) {

    const {

        xAxis,

        yAxis

    } = useDataset();

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

    const chartData = Object.keys(grouped).map((key) => ({

        [xAxis]: key,

        [yAxis]: grouped[key]

    }));

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

                {yAxis} Trend

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart
                    data={chartData}
                >

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey={xAxis}/>

                    <YAxis/>

                    <Tooltip/>

                    <Line
                        type="monotone"
                        dataKey={yAxis}
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default LineChartComponent;