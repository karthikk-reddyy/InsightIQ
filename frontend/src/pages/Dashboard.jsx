import { useDataset } from "../context/DatasetContext";

import UploadBox from "../components/Upload/UploadBox";
import DataPreview from "../components/DataPreview/DataPreview";
import Charts from "../components/Charts/Charts";
import KPICard from "../components/KPICard/KPICard";
import FilterBar from "../components/Filters/FilterBar";

import {
  Database,
  Columns3,
  AlertTriangle,
  BadgeCheck,
} from "lucide-react";

function Dashboard() {

    const {
        datasetInfo,
        setDatasetInfo,
        setChartData,
        filteredData,
        setFilteredData
    } = useDataset();

    const filteredRows = filteredData.length;

    const filteredMissing = filteredData.reduce((count, row) => {
        return count +
        Object.values(row).filter(
            value => value === "" || value === null
        ).length;
    }, 0);

    const quality =
        datasetInfo
            ? datasetInfo.missing_values === 0
                ? "Excellent"
                : "Needs Cleaning"
            : "--";

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 space-y-8 antialiased">

            {/* Hero Banner with Premium Gradient & Border */}
            <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-indigo-950/40 rounded-2xl p-8 border border-zinc-800 shadow-xl shadow-black/40">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    Welcome to InsightIQ <span className="inline-block animate-pulse">🚀</span>
                </h1>
                <p className="mt-3 text-sm font-medium text-zinc-400 max-w-md tracking-wide">
                    AI Powered Business Intelligence Platform
                </p>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Rows"
                    value={filteredRows}
                    icon={<Database size={24} className="text-blue-400" />}
                    color="bg-zinc-900 border border-zinc-800 shadow-lg shadow-black/20"
                />
                <KPICard
                    title="Columns"
                    value={datasetInfo ? datasetInfo.columns : 0}
                    icon={<Columns3 size={24} className="text-emerald-400" />}
                    color="bg-zinc-900 border border-zinc-800 shadow-lg shadow-black/20"
                />
                <KPICard
                    title="Missing"
                    value={filteredMissing}
                    icon={<AlertTriangle size={24} className="text-rose-400" />}
                    color="bg-zinc-900 border border-zinc-800 shadow-lg shadow-black/20"
                />
                <KPICard
                    title="Quality"
                    value={quality}
                    icon={<BadgeCheck size={24} className={quality === "Excellent" ? "text-emerald-400" : "text-amber-400"} />}
                    color="bg-zinc-900 border border-zinc-800 shadow-lg shadow-black/20"
                />
            </div>

            {/* Upload & Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Upload Section */}
                <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl shadow-black/30">
                    <h2 className="text-lg font-semibold text-zinc-100 tracking-tight mb-5">
                        Upload Dataset
                    </h2>
                    <UploadBox
                        setDatasetInfo={setDatasetInfo}
                        setChartData={setChartData}
                        setFilteredData={setFilteredData}
                    />
                </div>

                {/* Summary Section */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl shadow-black/30">
                    <h2 className="text-lg font-semibold text-zinc-100 tracking-tight mb-5">
                        Dataset Summary
                    </h2>
                    {datasetInfo ? (
                        <div className="space-y-4 divide-y divide-zinc-800/60">
                            <div className="pb-3">
                                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-1">
                                    File
                                </p>
                                <p className="font-medium text-zinc-200 truncate break-all">
                                    {datasetInfo.filename}
                                </p>
                            </div>
                            <div className="pt-3 pb-3">
                                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-1">
                                    Numeric Columns
                                </p>
                                <p className="text-xl font-semibold text-zinc-100">
                                    {datasetInfo.numeric_columns.length}
                                </p>
                            </div>
                            <div className="pt-3 pb-3">
                                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-1">
                                    Categorical Columns
                                </p>
                                <p className="text-xl font-semibold text-zinc-100">
                                    {datasetInfo.categorical_columns.length}
                                </p>
                            </div>
                            <div className="pt-3">
                                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-1">
                                    Memory Usage
                                </p>
                                <p className="text-xl font-semibold text-zinc-100">
                                    {datasetInfo.memory_usage} <span className="text-xs font-normal text-zinc-400">MB</span>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-48 border border-dashed border-zinc-800 rounded-xl">
                            <p className="text-sm text-zinc-500 tracking-wide">
                                No dataset active
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl shadow-black/30">
                <FilterBar />
            </div>

            {/* Charts Section */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl shadow-black/30">
                <h2 className="text-lg font-semibold text-zinc-100 tracking-tight mb-5">
                    Visual Analytics
                </h2>
                <Charts data={filteredData} />
            </div>

            {/* Table/Data Preview Section */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl shadow-black/30">
                <h2 className="text-lg font-semibold text-zinc-100 tracking-tight mb-5">
                    Data Preview
                </h2>
                <DataPreview data={filteredData.slice(0, 10)} />
            </div>
            
        </div>
    );
}

export default Dashboard;