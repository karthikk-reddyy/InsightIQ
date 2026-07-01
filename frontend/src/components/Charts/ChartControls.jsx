import { useEffect } from "react";

import { useDataset } from "../../context/DatasetContext";

function ChartControls() {

    const {

        datasetInfo,

        xAxis,
        setXAxis,

        yAxis,
        setYAxis

    } = useDataset();

    useEffect(() => {

        if (!datasetInfo)
            return;

        if (!xAxis && datasetInfo.categorical_columns.length > 0) {

            setXAxis(datasetInfo.categorical_columns[0]);

        }

        if (!yAxis && datasetInfo.numeric_columns.length > 0) {

            setYAxis(datasetInfo.numeric_columns[0]);

        }

    }, [datasetInfo]);

    if (!datasetInfo)
        return null;

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

            <h2 className="text-2xl font-bold mb-6">

                Chart Controls

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>

                    <label className="font-semibold">

                        X-Axis

                    </label>

                    <select

                        className="w-full border rounded-xl p-3 mt-2"

                        value={xAxis}

                        onChange={(e)=>setXAxis(e.target.value)}

                    >

                        {datasetInfo.categorical_columns.map(col=>(

                            <option

                                key={col}

                                value={col}

                            >

                                {col}

                            </option>

                        ))}

                    </select>

                </div>

                <div>

                    <label className="font-semibold">

                        Y-Axis

                    </label>

                    <select

                        className="w-full border rounded-xl p-3 mt-2"

                        value={yAxis}

                        onChange={(e)=>setYAxis(e.target.value)}

                    >

                        {datasetInfo.numeric_columns.map(col=>(

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