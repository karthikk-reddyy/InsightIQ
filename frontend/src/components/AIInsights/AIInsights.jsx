import { Brain } from "lucide-react";

function AIInsights({ datasetInfo }) {

  if (!datasetInfo) return null;

  const ai = datasetInfo.ai_insights;

  return (
    <div className="w-full bg-transparent flex flex-col items-center justify-center text-center">

      {/* Header section with icon aligned perfectly */}
      <div className="flex flex-col items-center justify-center gap-2 mb-6 w-full">
        <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shadow-inner">
          <Brain className="text-indigo-400" size={24} />
        </div>
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
          AI Business Insights
        </h2>
      </div>

      {/* Main Analysis Display area */}
      <div className="w-full bg-zinc-950/40 border border-zinc-800 rounded-xl p-5 mb-6 text-left shadow-inner">
        <h3 className="font-bold text-sm tracking-wide text-zinc-300 mb-3 flex items-center gap-2">
          <span>🤖</span> Gemini Analysis
        </h3>
        <p className="whitespace-pre-wrap leading-7 text-xs font-medium text-zinc-400">
          {datasetInfo.ai_summary}
        </p>
      </div>

      {/* Quick Insights Cards - Muted overlays instead of intense light colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

        <div className="bg-zinc-950/20 border border-zinc-800/60 rounded-xl p-4 text-left shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-400/90 mb-1">Dataset Summary</p>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">{ai.summary}</p>
        </div>

        <div className="bg-zinc-950/20 border border-zinc-800/60 rounded-xl p-4 text-left shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400/90 mb-1">Data Quality</p>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">{ai.quality}</p>
        </div>

        <div className="bg-zinc-950/20 border border-zinc-800/60 rounded-xl p-4 text-left shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-1">Recommendation</p>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">{ai.recommendation}</p>
        </div>

        <div className="bg-zinc-950/20 border border-zinc-800/60 rounded-xl p-4 text-left shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-400/90 mb-1">Duplicate Check</p>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">{ai.duplicates}</p>
        </div>

      </div>

    </div>
  );
}

export default AIInsights;