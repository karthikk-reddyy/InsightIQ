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
        <div className="w-full flex flex-col items-center justify-center text-center">
            
            <h2 className="text-base font-semibold text-zinc-200 tracking-tight mb-5 w-full">
                Dashboard Filters
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                
                {/* Filter Column Dropdown */}
                <div className="flex flex-col items-center">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                        Filter Column
                    </label>
                    <select
                        className="w-full bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-xl p-3 outline-none cursor-pointer transition-all focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 text-center"
                        value={selectedColumn}
                        onChange={(e) => {
                            setSelectedColumn(e.target.value);
                            setSelectedValue("");
                        }}
                    >
                        <option value="" className="bg-zinc-900">
                            Select Column
                        </option>
                        {datasetInfo.categorical_columns.map(col => (
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

                {/* Filter Value Dropdown */}
                <div className="flex flex-col items-center">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                        Filter Value
                    </label>
                    <select
                        className="w-full bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-xl p-3 outline-none cursor-pointer transition-all focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 text-center disabled:opacity-40 disabled:cursor-not-allowed"
                        value={selectedValue}
                        disabled={!selectedColumn}
                        onChange={(e) =>
                            setSelectedValue(e.target.value)
                        }
                    >
                        <option value="" className="bg-zinc-900">
                            Select Value
                        </option>
                        {values.map(value => (
                            <option
                                key={value}
                                value={value}
                                className="bg-zinc-900"
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