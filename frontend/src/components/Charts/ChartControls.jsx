import { useEffect } from "react";
import { useDataset } from "../../context/DatasetContext";

function ChartControls() {

    const {
        datasetInfo,
        chartType,
        setChartType,
        xAxis,
        setXAxis,
        yAxis,
        setYAxis
    } = useDataset();

    useEffect(() => {
        if (!datasetInfo)
            return;

        if (chartType === "Scatter") {
            if (
                !xAxis ||
                !datasetInfo.numeric_columns.includes(xAxis)
            ) {
                setXAxis(datasetInfo.numeric_columns[0] || "");
            }

            if (
                !yAxis ||
                !datasetInfo.numeric_columns.includes(yAxis)
            ) {
                setYAxis(
                    datasetInfo.numeric_columns[1] ||
                    datasetInfo.numeric_columns[0] ||
                    ""
                );
            }
        } else {
            if (
                !xAxis ||
                !datasetInfo.categorical_columns.includes(xAxis)
            ) {
                setXAxis(datasetInfo.categorical_columns[0] || "");
            }

            if (
                !yAxis ||
                !datasetInfo.numeric_columns.includes(yAxis)
            ) {
                setYAxis(datasetInfo.numeric_columns[0] || "");
            }
        }
    }, [datasetInfo, chartType]);

    if (!datasetInfo)
        return null;

    return (
        <div className="w-full bg-transparent flex flex-col items-center justify-center text-center">
            
            <h2 className="text-base font-semibold text-zinc-200 tracking-tight mb-5 w-full">
                Chart Controls
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">

                {/* Chart Type Selection */}
                <div className="flex flex-col items-center">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                        Chart Type
                    </label>
                    <select
                        className="w-full bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-xl p-3 outline-none cursor-pointer transition-all focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 text-center"
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                    >
                        <option value="Bar" className="bg-zinc-900">Bar Chart</option>
                        <option value="Line" className="bg-zinc-900">Line Chart</option>
                        <option value="Pie" className="bg-zinc-900">Pie Chart</option>
                        <option value="Scatter" className="bg-zinc-900">Scatter Plot</option>
                    </select>
                </div>

                {/* X Axis Selection */}
                <div className="flex flex-col items-center">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                        X Axis
                    </label>
                    <select
                        className="w-full bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-xl p-3 outline-none cursor-pointer transition-all focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 text-center"
                        value={xAxis}
                        onChange={(e) => setXAxis(e.target.value)}
                    >
                        {(chartType === "Scatter"
                            ? datasetInfo.numeric_columns
                            : datasetInfo.categorical_columns
                        ).map(col => (
                            <option
                                key={col}
                                value={col}
                                className="bg-zinc-900"
                            >
                                {col}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Y Axis Selection */}
                <div className="flex flex-col items-center">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                        Y Axis
                    </label>
                    <select
                        className="w-full bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-xl p-3 outline-none cursor-pointer transition-all focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 text-center"
                        value={yAxis}
                        onChange={(e) => setYAxis(e.target.value)}
                    >
                        {datasetInfo.numeric_columns.map(col => (
                            <option
                                key={col}
                                value={col}
                                className="bg-zinc-900"
                            >
                                {col}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    );
}

export default ChartControls;