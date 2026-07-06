import { useDataset } from "../context/DatasetContext";

import ReportHeader from "../components/Reports/ReportHeader";
import ExecutiveSummary from "../components/Reports/ExecutiveSummary";
import ReportActions from "../components/Reports/ReportActions";
import SummaryCard from "../components/Reports/SummaryCard";
import TopPerformers from "../components/Reports/TopPerformers";
import ReportTable from "../components/Reports/ReportTable";
import BusinessInsights from "../components/Reports/BusinessInsights";
import AISummary from "../components/Reports/AISummary";

import Charts from "../components/Charts/Charts";

function Reports() {
    const { datasetInfo } = useDataset();

    if (!datasetInfo) {
        return (
            <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    Upload a dataset first 📂
                </h2>
                <p className="text-sm font-medium text-zinc-500 tracking-wide mt-4 max-w-sm">
                    Please head over to the Dashboard tab to process a data asset before rendering reports.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 p-6 space-y-8 antialiased">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Custom Report Layout Banner */}
                <div className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl p-6 shadow-xl">
                    <ReportHeader datasetInfo={datasetInfo} />
                </div>

                {/* Executive Content Section */}
                <div className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl p-6 shadow-xl">
                    <ExecutiveSummary datasetInfo={datasetInfo} />
                </div>

                {/* Functional Action Options Block */}
                <div className="w-full flex justify-end">
                    <ReportActions />
                </div>

                {/* Local Analytical Overview Component */}
                <div className="space-y-4">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 pl-1">
                        Dataset Summary
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        <SummaryCard title="Rows" value={datasetInfo.rows} />
                        <SummaryCard title="Columns" value={datasetInfo.columns} />
                        <SummaryCard title="Duplicates" value={datasetInfo.duplicates} />
                        <SummaryCard title="Missing Values" value={datasetInfo.missing_values} />
                    </div>
                </div>

                {/* Segmentation: Top Performers Table Wrapper */}
                <div className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl p-6 shadow-xl">
                    <TopPerformers topPerformers={datasetInfo.top_performers} />
                </div>

                {/* Structuring Matrix Table Data Previews */}
                <div className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl p-6 shadow-xl">
                    <ReportTable datasetInfo={datasetInfo} />
                </div>

                {/* Visualization Components Rendering Engine */}
                <div className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl p-6 shadow-xl">
                    <Charts data={datasetInfo.data} />
                </div>

                {/* Business Model Analysis Insight Block */}
                <div className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl p-6 shadow-xl">
                    <BusinessInsights datasetInfo={datasetInfo} />
                </div>

                {/* Text Streaming LLM Summary Block Area */}
                <div className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl p-6 shadow-xl">
                    <AISummary summary={datasetInfo.ai_summary} />
                </div>

            </div>
        </div>
    );
}

export default Reports;