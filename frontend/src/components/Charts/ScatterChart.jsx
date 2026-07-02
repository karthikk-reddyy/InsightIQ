import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

import { useDataset } from "../../context/DatasetContext";

function ScatterChartComponent({ data }) {

    const { xAxis, yAxis } = useDataset();

    if (!data || data.length === 0 || !xAxis || !yAxis)
        return null;

    const scatterData = data
        .map((row) => ({
            x: Number(row[xAxis]),
            y: Number(row[yAxis])
        }))
        .filter(
            (row) => !isNaN(row.x) && !isNaN(row.y)
        );

    if (scatterData.length === 0)
        return null;

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

                {yAxis} vs {xAxis}

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <ScatterChart>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis
                        dataKey="x"
                        name={xAxis}
                    />

                    <YAxis
                        dataKey="y"
                        name={yAxis}
                    />

                    <Tooltip />

                    <Scatter
                        data={scatterData}
                        fill="#2563eb"
                    />

                </ScatterChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ScatterChartComponent;