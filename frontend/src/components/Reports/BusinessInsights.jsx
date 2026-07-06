function BusinessInsights({ datasetInfo }) {

    if (!datasetInfo) return null;

    return (
        <div className="w-full bg-transparent flex flex-col">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <span>📊</span> Business Insights
            </h2>
            
            <div className="w-full bg-zinc-950/40 border border-zinc-800 rounded-xl p-5 shadow-inner">
                <ul className="space-y-4 text-xs font-medium text-zinc-400">
                    
                    <li className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                        <span className="text-zinc-500">Dataset Records</span>
                        <span className="text-zinc-200 font-bold bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">{datasetInfo.rows}</span>
                    </li>

                    <li className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                        <span className="text-zinc-500">Total Columns</span>
                        <span className="text-zinc-200 font-bold bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">{datasetInfo.columns}</span>
                    </li>

                    <li className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                        <span className="text-zinc-500">Duplicate Records</span>
                        <span className={`font-bold bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800 ${datasetInfo.duplicates > 0 ? 'text-rose-400' : 'text-zinc-400'}`}>
                            {datasetInfo.duplicates}
                        </span>
                    </li>

                    <li className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                        <span className="text-zinc-500">Missing Values</span>
                        <span className={`font-bold bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800 ${datasetInfo.missing_values > 0 ? 'text-amber-400' : 'text-zinc-400'}`}>
                            {datasetInfo.missing_values}
                        </span>
                    </li>

                    <li className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                        <span className="text-zinc-500">Numeric Columns</span>
                        <span className="text-indigo-400 font-bold bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">{datasetInfo.numeric_columns.length}</span>
                    </li>

                    <li className="flex items-center justify-between">
                        <span className="text-zinc-500">Categorical Columns</span>
                        <span className="text-purple-400 font-bold bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">{datasetInfo.categorical_columns.length}</span>
                    </li>

                </ul>
            </div>
        </div>
    );
}

export default BusinessInsights;