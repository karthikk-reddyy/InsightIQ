import { useDataset } from "../context/DatasetContext";

import AIInsights from "../components/AIInsights/AIInsights";
import AIChat from "../components/AIChat/AIChat";

function Analytics() {

    const {
        datasetInfo,
    } = useDataset();

    if (!datasetInfo) {
        return (
            <div className="text-center mt-20">
                <h1 className="text-3xl font-bold">
                    AI Analytics
                </h1>

                <p className="text-gray-500 mt-5">
                    Please upload a dataset first from the Dashboard.
                </p>
            </div>
        );
    }

    return (

        <div>

            <h1 className="text-3xl font-bold">
                AI Analytics
            </h1>

            <p className="text-gray-500 mt-2">
                Ask questions and generate AI business insights.
            </p>

            <AIInsights
                datasetInfo={datasetInfo}
            />

            <AIChat
                datasetInfo={datasetInfo}
            />

        </div>

    );

}

export default Analytics;