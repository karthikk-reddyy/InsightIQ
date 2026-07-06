import { useDataset } from "../context/DatasetContext";

import AIInsights from "../components/AIInsights/AIInsights";
import AIChat from "../components/AIChat/AIChat";

function Analytics() {

    const {
        datasetInfo,
    } = useDataset();

    if (!datasetInfo) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    AI Analytics
                </h1>
                <p className="text-sm font-medium text-zinc-500 tracking-wide mt-4 max-w-sm">
                    Please upload a dataset first from the Dashboard.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 space-y-6 antialiased max-w-7xl mx-auto flex flex-col justify-center">

            {/* Header Layout */}
            <div className="w-full flex flex-col items-center justify-center text-center border-b border-zinc-900 pb-6">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    AI Analytics
                </h1>
                <p className="text-xs font-medium text-zinc-500 tracking-wide mt-2">
                    Ask questions and generate AI business insights.
                </p>
            </div>

            {/* Insights Display Container */}
            <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
                <AIInsights datasetInfo={datasetInfo} />
            </div>

            {/* Chat Interaction Container */}
            <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
                <AIChat datasetInfo={datasetInfo} />
            </div>

        </div>
    );
}

export default Analytics;