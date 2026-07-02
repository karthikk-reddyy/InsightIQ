function ExecutiveSummary({ datasetInfo }) {

    if (!datasetInfo) return null;

    const today = new Date();

    return (

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-8 mt-8">

            <h2 className="text-3xl font-bold mb-6">

                Executive Summary

            </h2>

            <div className="grid lg:grid-cols-2 gap-6">

                <div>

                    <p>

                        <b>Dataset Quality :</b>

                        {" "}
                        {datasetInfo.quality}

                    </p>

                    <p className="mt-3">

                        <b>Primary KPI :</b>

                        {" "}
                        {datasetInfo.kpis.column}

                    </p>

                    <p className="mt-3">

                        <b>Total {datasetInfo.kpis.column} :</b>

                        {" "}
                        {datasetInfo.kpis.total.toLocaleString()}

                    </p>

                </div>

                <div>

                    <p>

                        <b>Report Generated :</b>

                        {" "}
                        {today.toLocaleDateString()}

                    </p>

                    <p className="mt-3">

                        <b>Rows :</b>

                        {" "}
                        {datasetInfo.rows}

                    </p>

                    <p className="mt-3">

                        <b>Columns :</b>

                        {" "}
                        {datasetInfo.columns}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default ExecutiveSummary;