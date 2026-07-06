function SummaryCard({ title, value }) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-md transition-all hover:border-zinc-700/50">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">
                {title}
            </h3>
            <p className="text-xl font-extrabold text-zinc-100 mt-1">
                {value}
            </p>
        </div>
    );
}

export default SummaryCard;