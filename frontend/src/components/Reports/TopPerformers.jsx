function TopPerformers({ topPerformers }) {

    if (
        !topPerformers ||
        Object.keys(topPerformers).length === 0
    ) {
        return null;
    }

    return (

        <div className="mt-8">

            <h2 className="text-2xl font-bold mb-6">

                Top Performers

            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {Object.entries(topPerformers).map(([column, value]) => (

                    <div
                        key={column}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >

                        <h3 className="text-gray-500 text-sm">

                            Top {column}

                        </h3>

                        <p className="text-xl font-bold mt-3">

                            {value.name}

                        </p>

                        <p className="text-blue-600 mt-2">

                            {value.value.toLocaleString()}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default TopPerformers;