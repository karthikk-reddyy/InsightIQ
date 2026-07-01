import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import { useDataset } from "../../context/DatasetContext";

function BarChartComponent({ data }) {

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

                {yAxis} by {xAxis}

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart
                    data={chartData}
                >

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey={xAxis}/>

                    <YAxis/>

                    <Tooltip/>

                    <Bar
                        dataKey={yAxis}
                        fill="#2563eb"
                        radius={[8,8,0,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default BarChartComponent;