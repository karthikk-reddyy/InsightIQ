function ReportHeader({ datasetInfo }) {

    if (!datasetInfo) return null;

    const today = new Date();

    return (
        <div className="w-full bg-transparent flex flex-col text-zinc-100">
            
            {/* Upper Info Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">
                        Business Report
                    </h1>
                    <p className="text-xs font-medium text-zinc-500 tracking-wide mt-1">
                        AI Powered Business Intelligence Report
                    </p>
                </div>
                
                <div className="text-left sm:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Generated On
                    </p>
                    <p className="text-xs font-bold text-zinc-300 mt-0.5">
                        {today.toLocaleDateString()}
                    </p>
                </div>
            </div>

            <hr className="border-zinc-900 my-5" />

            {/* Meta Properties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs font-medium">
                <div className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-4 shadow-inner">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">
                        Dataset Source File
                    </p>
                    <h3 className="text-sm font-bold text-zinc-200 truncate">
                        {datasetInfo.filename}
                    </h3>
                </div>

                <div className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-4 shadow-inner">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">
                        Engine Authorization
                    </p>
                    <h3 className="text-sm font-bold text-zinc-200">
                        InsightIQ Core
                    </h3>
                </div>

                <div className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-4 shadow-inner flex flex-col justify-between items-start">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5">
                        Pipeline Status
                    </p>
                    <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-900/60 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                        Ready
                    </span>
                </div>
            </div>

        </div>
    );
}

export default ReportHeader;