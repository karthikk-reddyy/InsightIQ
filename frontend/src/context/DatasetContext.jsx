import { createContext, useContext, useState } from "react";

const DatasetContext = createContext();

export function DatasetProvider({ children }) {

    // ==========================
    // Dataset
    // ==========================

    const [datasetInfo, setDatasetInfo] = useState(null);

    const [chartData, setChartData] = useState(null);

    const [filteredData, setFilteredData] = useState([]);

    // ==========================
    // Chart Settings
    // ==========================

    const [chartType, setChartType] = useState("Bar");

    const [xAxis, setXAxis] = useState("");

    const [yAxis, setYAxis] = useState("");

    // ==========================
    // User Settings
    // ==========================

    const [username, setUsername] = useState("");

    const [company, setCompany] = useState("");

    const [theme, setTheme] = useState("Light");

    const [defaultChart, setDefaultChart] = useState("Bar");

    const [aiResponse, setAIResponse] = useState("Medium");

    return (

        <DatasetContext.Provider
            value={{

                // Dataset
                datasetInfo,
                setDatasetInfo,

                chartData,
                setChartData,

                filteredData,
                setFilteredData,

                // Charts
                chartType,
                setChartType,

                xAxis,
                setXAxis,

                yAxis,
                setYAxis,

                // Settings
                username,
                setUsername,

                company,
                setCompany,

                theme,
                setTheme,

                defaultChart,
                setDefaultChart,

                aiResponse,
                setAIResponse

            }}
        >

            {children}

        </DatasetContext.Provider>

    );

}

export function useDataset() {

    return useContext(DatasetContext);

}