function KPICard({
    title,
    value,
    icon,
    color
}) {

    return (
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 shadow-xl shadow-black/30 flex flex-col items-center justify-center text-center w-full min-h-[140px]">
            
            {/* Muted Title Label */}
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {title}
            </p>

            {/* Premium Dynamic Accent Badge for Icon */}
            <div className="my-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shadow-inner">
                {icon}
            </div>

            {/* Prominent Data Value */}
            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-100 break-all max-w-full px-2">
                {value}
            </h2>

        </div>
    );
}

export default KPICard;