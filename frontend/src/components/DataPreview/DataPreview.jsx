
function DataPreview({ data }) {

    if (!data || data.length === 0)
        return null;

    const columns = Object.keys(data[0]);

    return (

        <div className="bg-white rounded-2xl shadow-lg mt-8 p-6">

            <h2 className="text-2xl font-bold mb-5">
                Dataset Preview
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="bg-blue-600 text-white">

                            {columns.map((column) => (

                                <th
                                    key={column}
                                    className="px-4 py-3 text-left"
                                >
                                    {column}
                                </th>

                            ))}

                        </tr>

                    </thead>

                    <tbody>

                        {data.map((row, index) => (

                            <tr
                                key={index}
                                className="border-b hover:bg-gray-50"
                            >

                                {columns.map((column) => (

                                    <td
                                        key={column}
                                        className="px-4 py-3"
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

