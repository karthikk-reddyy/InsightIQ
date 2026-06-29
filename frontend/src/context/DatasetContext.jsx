import { createContext, useContext, useState } from "react";

const DatasetContext = createContext();

export function DatasetProvider({ children }) {

    const [datasetInfo, setDatasetInfo] = useState(null);

    const [chartData, setChartData] = useState(null);

    // NEW
    const [filteredData, setFilteredData] = useState([]);

    return (

        <DatasetContext.Provider
            value={{

                datasetInfo,
                setDatasetInfo,

                chartData,
                setChartData,

                // NEW
                filteredData,
                setFilteredData

            }}
        >

            {children}

        </DatasetContext.Provider>

    );

}

export function useDataset(){

    return useContext(DatasetContext);

}