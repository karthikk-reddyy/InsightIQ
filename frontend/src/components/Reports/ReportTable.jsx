function ReportTable({ datasetInfo }) {
    if (!datasetInfo) return null;

    return (
        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl flex flex-col">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <span>📋</span> Structural Metrics Preview
            </h2>
            
            <div className="w-full bg-zinc-950/40 border border-zinc-800/60 rounded-xl overflow-hidden shadow-inner">
                <table className="w-full text-xs text-left text-zinc-400 font-medium">
                    <tbody>
                        <tr className="border-b border-zinc-900/60 transition-colors hover:bg-zinc-900/20">
                            <td className="p-4 font-semibold text-zinc-500 w-1/3">
                                Dataset File
                            </td>
                            <td className="p-4 text-zinc-200 font-bold truncate max-w-[200px]">
                                {datasetInfo.filename}
                            </td>
                        </tr>
                        <tr className="border-b border-zinc-900/60 transition-colors hover:bg-zinc-900/20">
                            <td className="p-4 font-semibold text-zinc-500">
                                Total Rows
                            </td>
                            <td className="p-4 text-zinc-200 font-bold">
                                {datasetInfo.rows}
                            </td>
                        </tr>
                        <tr className="border-b border-zinc-900/60 transition-colors hover:bg-zinc-900/20">
                            <td className="p-4 font-semibold text-zinc-500">
                                Total Columns
                            </td>
                            <td className="p-4 text-zinc-200 font-bold">
                                {datasetInfo.columns}
                            </td>
                        </tr>
                        <tr className="border-b border-zinc-900/60 transition-colors hover:bg-zinc-900/20">
                            <td className="p-4 font-semibold text-zinc-500">
                                Missing Values
                            </td>
                            <td className={`p-4 font-bold ${datasetInfo.missing_values > 0 ? 'text-amber-400' : 'text-zinc-400'}`}>
                                {datasetInfo.missing_values}
                            </td>
                        </tr>
                        <tr className="transition-colors hover:bg-zinc-900/20">
                            <td className="p-4 font-semibold text-zinc-500">
                                Duplicate Entries
                            </td>
                            <td className={`p-4 font-bold ${datasetInfo.duplicates > 0 ? 'text-rose-400' : 'text-zinc-400'}`}>
                                {datasetInfo.duplicates}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReportTable;