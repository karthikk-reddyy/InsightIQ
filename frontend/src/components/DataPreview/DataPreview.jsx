function DataPreview({ data }) {

    if (!data || data.length === 0)
        return null;

    const columns = Object.keys(data[0]);

    return (
        <div className="w-full flex flex-col items-center justify-center text-center">

            <h2 className="text-base font-semibold text-zinc-200 tracking-tight mb-5 w-full">
                Data Preview
            </h2>

            <div className="w-full overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/40 shadow-inner">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-zinc-900 border-b border-zinc-800">
                            {columns.map((column) => (
                                <th
                                    key={column}
                                    className="px-5 py-3.5 text-left font-semibold text-zinc-300 tracking-wide uppercase text-xs whitespace-nowrap"
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className="transition-colors duration-150 hover:bg-zinc-900/50"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column}
                                        className="px-5 py-3 text-left text-zinc-400 whitespace-nowrap"
                                    >
                                        {String(row[column])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default DataPreview;