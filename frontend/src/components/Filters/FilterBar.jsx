import { useEffect, useMemo, useState } from "react";
import { useDataset } from "../../context/DatasetContext";

function FilterBar() {

    const {

        datasetInfo,

        setFilteredData

    } = useDataset();

    const [selectedColumn, setSelectedColumn] = useState("");

    const [selectedValue, setSelectedValue] = useState("");

    // Initialize data whenever a new dataset is uploaded
    useEffect(() => {

        if (datasetInfo?.data) {

            setFilteredData(datasetInfo.data);

        }

    }, [datasetInfo]);

    // Get unique values for the selected column
    const values = useMemo(() => {

        if (!selectedColumn || !datasetInfo?.data) return [];

        return [

            "All",

            ...new Set(

                datasetInfo.data.map(row => String(row[selectedColumn]))

            )

        ];

    }, [selectedColumn, datasetInfo]);

    // Apply filter automatically
    useEffect(() => {

        if (!datasetInfo?.data) return;

        let data = [...datasetInfo.data];

        if (selectedColumn && selectedValue && selectedValue !== "All") {

            data = data.filter(

                row => String(row[selectedColumn]) === selectedValue

            );

        }

        setFilteredData(data);

    }, [

        selectedColumn,

        selectedValue,

        datasetInfo

    ]);

    if (!datasetInfo) return null;

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">

                Dashboard Filters

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>

                    <label className="font-semibold">

                        Filter Column

                    </label>

                    <select

                        className="w-full border rounded-xl p-3 mt-2"

                        value={selectedColumn}

                        onChange={(e) => {

                            setSelectedColumn(e.target.value);

                            setSelectedValue("");

                        }}

                    >

                        <option value="">

                            Select Column

                        </option>

                        {datasetInfo.categorical_columns.map(col => (

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

                        Filter Value

                    </label>

                    <select

                        className="w-full border rounded-xl p-3 mt-2"

                        value={selectedValue}

                        disabled={!selectedColumn}

                        onChange={(e) =>

                            setSelectedValue(e.target.value)

                        }

                    >

                        <option value="">

                            Select Value

                        </option>

                        {values.map(value => (

                            <option

                                key={value}

                                value={value}

                            >

                                {value}

                            </option>

                        ))}

                    </select>

                </div>

            </div>

        </div>

    );

}

export default FilterBar;