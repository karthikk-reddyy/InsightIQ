
import { useDataset } from "../context/DatasetContext";

import UploadBox from "../components/Upload/UploadBox";
import DataPreview from "../components/DataPreview/DataPreview";
import Charts from "../components/Charts/Charts";
import KPICard from "../components/KPICard/KPICard";
import AIInsights from "../components/AIInsights/AIInsights";
import AIChat from "../components/AIChat/AIChat";
import FilterBar from "../components/Filters/FilterBar";

import {
  Database,
  Columns3,
  AlertTriangle,
  FileSpreadsheet,
} from "lucide-react";

function Dashboard() {
    const {

  datasetInfo,
  setDatasetInfo,

  chartData,
  setChartData,

  filteredData,
  setFilteredData

} = useDataset();
const filteredRows = filteredData.length;

const filteredColumns = datasetInfo?.columns || 0;

const filteredMissing = filteredData.reduce((count, row) => {
    return count + Object.values(row).filter(
        value => value === "" || value === null
    ).length;
}, 0);
  

  return (
    <div>

      {/* Heading */}

      <h1 className="text-3xl font-bold">
        Welcome to InsightIQ 🚀
      </h1>

      <p className="text-gray-500 mt-2">
        AI Powered Business Intelligence Platform
      </p>

      {/* First KPI Row */}

      <div className="grid grid-cols-4 gap-6 mt-8">

        <KPICard
          title="Rows"
          value={filteredRows}
          icon={<Database size={30} />}
          color="bg-blue-500"
        />

        <KPICard
          title="Columns"
          value={datasetInfo ? datasetInfo.columns : 0}
          icon={<Columns3 size={30} />}
          color="bg-green-500"
        />

        <KPICard
          title="Missing Values"
          value={filteredMissing}
          icon={<AlertTriangle size={30} />}
          color="bg-red-500"
        />

        <KPICard
          title="Dataset"
          value={datasetInfo ? datasetInfo.filename : "-"}
          icon={<FileSpreadsheet size={30} />}
          color="bg-purple-500"
        />

      </div>

      {/* Second KPI Row */}

      {datasetInfo && (

        <div className="grid grid-cols-4 gap-6 mt-6">

          <KPICard
            title="Duplicates"
            value={datasetInfo.duplicates}
            icon={<Database size={30} />}
            color="bg-orange-500"
          />

          <KPICard
            title="Memory"
            value={`${datasetInfo.memory_usage} MB`}
            icon={<FileSpreadsheet size={30} />}
            color="bg-cyan-500"
          />

          <KPICard
            title="Numeric Columns"
            value={datasetInfo.numeric_columns.length}
            icon={<Columns3 size={30} />}
            color="bg-indigo-500"
          />

          <KPICard
            title="Categorical Columns"
            value={datasetInfo.categorical_columns.length}
            icon={<AlertTriangle size={30} />}
            color="bg-pink-500"
          />

        </div>

      )}

      {/* Upload Section */}

      
        
        <UploadBox
        setDatasetInfo={setDatasetInfo}
        setChartData={setChartData}
        setFilteredData={setFilteredData}

        />
        <FilterBar/>

       



      {/* Dataset Preview */}

      <DataPreview
    data={filteredData.slice(0, 10)}
/>

      {/* Charts */}

         <Charts
    data={filteredData}
/>

    </div>
  );
}

export default Dashboard;

