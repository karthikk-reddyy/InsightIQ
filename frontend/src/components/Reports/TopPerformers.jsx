function TopPerformers({ topPerformers }) {

    if (!topPerformers || Object.keys(topPerformers).length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-transparent flex flex-col">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <span>🏆</span> Top Performers
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {Object.entries(topPerformers).map(([column, value]) => (
                    <div
                        key={column}
                        className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-5 text-left shadow-inner flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">
                                Top {column}
                            </h3>
                            <p className="text-sm font-bold text-zinc-200 truncate">
                                {value.name}
                            </p>
                        </div>
                        
                        <p className="text-xs font-extrabold text-indigo-400 mt-3 bg-zinc-900/60 px-2.5 py-1 rounded-md border border-zinc-800/80 w-fit">
                            {value.value.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopPerformers;