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

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

            <h2 className="text-2xl font-bold mb-6">

                Chart Controls

            </h2>

            <div className="grid lg:grid-cols-3 gap-6">

                {/* Chart Type */}

                <div>

                    <label className="font-semibold">

                        Chart Type

                    </label>

                    <select

                        className="w-full border rounded-xl p-3 mt-2"

                        value={chartType}

                        onChange={(e)=>setChartType(e.target.value)}

                    >

                        <option value="Bar">Bar Chart</option>
                        <option value="Line">Line Chart</option>
                        <option value="Pie">Pie Chart</option>
                        <option value="Scatter">Scatter Plot</option>

                    </select>

                </div>

                {/* X Axis */}

                <div>

                    <label className="font-semibold">

                        X Axis

                    </label>

                    <select

                        className="w-full border rounded-xl p-3 mt-2"

                        value={xAxis}

                        onChange={(e)=>setXAxis(e.target.value)}

                    >

                        {(chartType === "Scatter"
                            ? datasetInfo.numeric_columns
                            : datasetInfo.categorical_columns
                        ).map(col => (

                            <option
                                key={col}
                                value={col}
                            >

                                {col}

                            </option>

                        ))}

                    </select>

                </div>

                {/* Y Axis */}

                <div>

                    <label className="font-semibold">

                        Y Axis

                    </label>

                    <select

                        className="w-full border rounded-xl p-3 mt-2"

                        value={yAxis}

                        onChange={(e)=>setYAxis(e.target.value)}

                    >

                        {datasetInfo.numeric_columns.map(col => (

                            <option
                                key={col}
                                value={col}
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