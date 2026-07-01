import { createContext, useContext, useState } from "react";

const DatasetContext = createContext();

export function DatasetProvider({ children }) {

    // Uploaded Dataset
    const [datasetInfo, setDatasetInfo] = useState(null);

    // Chart Data (optional if you still use backend chart API)
    const [chartData, setChartData] = useState(null);

    // Filtered Dataset
    const [filteredData, setFilteredData] = useState([]);

    // Selected Chart Axes
    const [xAxis, setXAxis] = useState("");

    const [yAxis, setYAxis] = useState("");

    return (

        <DatasetContext.Provider
            value={{

                // Dataset
                datasetInfo,
                setDatasetInfo,

                // Charts
                chartData,
                setChartData,

                // Filters
                filteredData,
                setFilteredData,

                // Dynamic Chart Axes
                xAxis,
                setXAxis,

                yAxis,
                setYAxis

            }}
        >

            {children}

        </DatasetContext.Provider>

    );

}

export function useDataset() {

    return useContext(DatasetContext);

}