import { Brain } from "lucide-react";

function AIInsights({ datasetInfo }) {

  if (!datasetInfo) return null;

  const ai = datasetInfo.ai_insights;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-blue-600" size={32} />

        <h2 className="text-2xl font-bold">
          AI Business Insights
        </h2>
      </div>

      {/* Gemini AI Response */}

      <div className="bg-slate-100 rounded-xl p-5 mb-6">

        <h3 className="font-bold text-lg mb-3">
          🤖 Gemini Analysis
        </h3>

        <p className="whitespace-pre-wrap leading-8 text-gray-700">
          {datasetInfo.ai_summary}
        </p>

      </div>

      {/* Quick Insights */}

      <div className="space-y-4">

        <div className="bg-blue-50 rounded-xl p-4">
          <p className="font-semibold">Dataset Summary</p>
          <p>{ai.summary}</p>
        </div>

        <div className="bg-green-50 rounded-xl p-4">
          <p className="font-semibold">Data Quality</p>
          <p>{ai.quality}</p>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4">
          <p className="font-semibold">Recommendation</p>
          <p>{ai.recommendation}</p>
        </div>

        <div className="bg-red-50 rounded-xl p-4">
          <p className="font-semibold">Duplicate Check</p>
          <p>{ai.duplicates}</p>
        </div>

      </div>

    </div>
  );
}

export default AIInsights;