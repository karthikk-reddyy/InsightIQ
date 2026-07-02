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

            <div className="flex justify-center items-center h-[70vh]">

                <h2 className="text-3xl font-bold text-gray-600">

                    Upload a dataset first 📂

                </h2>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Report Header */}

            <ReportHeader
                datasetInfo={datasetInfo}
            />

            {/* Executive Summary */}

            <ExecutiveSummary
                datasetInfo={datasetInfo}
            />

            {/* Download Button */}

            <ReportActions />

            {/* Dataset Summary */}

            <div>

                <h2 className="text-2xl font-bold mb-6">

                    Dataset Summary

                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <SummaryCard
                        title="Rows"
                        value={datasetInfo.rows}
                    />

                    <SummaryCard
                        title="Columns"
                        value={datasetInfo.columns}
                    />

                    <SummaryCard
                        title="Duplicates"
                        value={datasetInfo.duplicates}
                    />

                    <SummaryCard
                        title="Missing Values"
                        value={datasetInfo.missing_values}
                    />

                </div>

            </div>

            {/* Top Performers */}

            <TopPerformers
                topPerformers={datasetInfo.top_performers}
            />

            {/* Dataset Preview */}

            <ReportTable
                datasetInfo={datasetInfo}
            />

            {/* Charts */}

            <Charts
                data={datasetInfo.data}
            />

            {/* AI Insights */}

            <BusinessInsights
                datasetInfo={datasetInfo}
            />

            {/* AI Summary */}

            <AISummary
                summary={datasetInfo.ai_summary}
            />

        </div>

    );

}

export default Reports;