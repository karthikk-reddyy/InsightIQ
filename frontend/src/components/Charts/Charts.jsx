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
        <div className="w-full flex flex-col items-center justify-center text-center">

            {/* Render controls neatly at the top */}
            <div className="w-full flex justify-center mb-6">
                <ChartControls />
            </div>

            {/* Seamless wrapper for the inner charts */}
            <div className="w-full bg-zinc-950/30 border border-zinc-800/80 rounded-xl p-6 shadow-inner flex justify-center items-center">
                <div className="w-full flex justify-center items-center text-zinc-100">
                    {chartType === "Bar" && (
                        <BarChartComponent data={data} />
                    )}

                    {chartType === "Line" && (
                        <LineChartComponent data={data} />
                    )}

                    {chartType === "Pie" && (
                        <PieChartComponent data={data} />
                    )}

                    {chartType === "Scatter" && (
                        <ScatterChartComponent data={data} />
                    )}
                </div>
            </div>

        </div>
    );
}

export default Charts;