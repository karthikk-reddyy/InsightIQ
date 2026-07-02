import BarChartComponent from "./BarChart";
import LineChartComponent from "./LineChart";
import PieChartComponent from "./PieChart";
import ScatterChartComponent from "./ScatterChart";
import ChartControls from "./ChartControls";

import { useDataset } from "../../context/DatasetContext";

function Charts({ data }) {

    const { chartType } = useDataset();

    if (!data || data.length === 0)
        return null;

    return (

        <div className="mt-8">

            <ChartControls />

            <h2 className="text-2xl font-bold mb-6">

                Analytics Dashboard

            </h2>

            <div className="bg-white rounded-2xl shadow-lg p-4">

                {chartType === "Bar" && (

                    <BarChartComponent
                        data={data}
                    />

                )}

                {chartType === "Line" && (

                    <LineChartComponent
                        data={data}
                    />

                )}

                {chartType === "Pie" && (

                    <PieChartComponent
                        data={data}
                    />

                )}

                {chartType === "Scatter" && (

                    <ScatterChartComponent
                        data={data}
                    />

                )}

            </div>

        </div>

    );

}

export default Charts;