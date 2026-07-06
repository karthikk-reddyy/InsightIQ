function AISummary({ summary }) {

    if (!summary) return null;

    return (
        <div className="w-full bg-transparent flex flex-col">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <span>🤖</span> AI Business Summary
            </h2>
            <div className="w-full bg-zinc-950/40 border border-zinc-800 rounded-xl p-5 text-left shadow-inner">
                <p className="whitespace-pre-wrap leading-7 text-xs font-medium text-zinc-400">
                    {summary}
                </p>
            </div>
        </div>
    );
}

export default AISummary;