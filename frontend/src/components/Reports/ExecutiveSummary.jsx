function ExecutiveSummary({ datasetInfo }) {

    if (!datasetInfo) return null;

    const today = new Date();

    return (
        <div className="w-full bg-transparent flex flex-col">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <span>📋</span> Executive Summary
            </h2>
            
            <div className="w-full bg-zinc-950/40 border border-zinc-800 rounded-xl p-5 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs font-medium text-zinc-400">
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                            <span className="text-zinc-500">Dataset Quality</span>
                            <span className="text-zinc-200 font-bold bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                                {datasetInfo.quality}
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                            <span className="text-zinc-500">Primary KPI</span>
                            <span className="text-indigo-400 font-bold bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                                {datasetInfo.kpis.column}
                            </span>
                        </div>

                        <div className="flex items-center justify-between md:border-none pb-2 md:pb-0">
                            <span className="text-zinc-500">Total {datasetInfo.kpis.column}</span>
                            <span className="text-emerald-400 font-extrabold bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                                {datasetInfo.kpis.total.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                            <span className="text-zinc-500">Report Generated</span>
                            <span className="text-zinc-300 font-bold bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                                {today.toLocaleDateString()}
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                            <span className="text-zinc-500">Rows</span>
                            <span className="text-zinc-200 font-bold bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                                {datasetInfo.rows}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-zinc-500">Columns</span>
                            <span className="text-zinc-200 font-bold bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                                {datasetInfo.columns}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ExecutiveSummary;