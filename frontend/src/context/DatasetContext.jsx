import { createContext, useContext, useState } from "react";

const DatasetContext = createContext();

export function DatasetProvider({ children }) {

    // Uploaded Dataset
    const [datasetInfo, setDatasetInfo] = useState(null);

    // Chart Data
    const [chartData, setChartData] = useState(null);

    // Filtered Dataset
    const [filteredData, setFilteredData] = useState([]);

    // Selected Chart Axes
    const [xAxis, setXAxis] = useState("");

    const [yAxis, setYAxis] = useState("");

    // Selected Chart Type
    const [chartType, setChartType] = useState("Bar");

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
                setYAxis,

                // Chart Type
                chartType,
                setChartType

            }}
        >

            {children}

        </DatasetContext.Provider>

    );

}

export function useDataset() {

    return useContext(DatasetContext);

}