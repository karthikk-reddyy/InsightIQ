function ReportTable({ datasetInfo }) {

    if (!datasetInfo) return null;

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">

                Dataset Summary

            </h2>

            <table className="w-full">

                <tbody>

                    <tr className="border-b">

                        <td className="py-3 font-semibold">
                            Dataset
                        </td>

                        <td>
                            {datasetInfo.filename}
                        </td>

                    </tr>

                    <tr className="border-b">

                        <td className="py-3 font-semibold">
                            Rows
                        </td>

                        <td>
                            {datasetInfo.rows}
                        </td>

                    </tr>

                    <tr className="border-b">

                        <td className="py-3 font-semibold">
                            Columns
                        </td>

                        <td>
                            {datasetInfo.columns}
                        </td>

                    </tr>

                    <tr className="border-b">

                        <td className="py-3 font-semibold">
                            Missing Values
                        </td>

                        <td>
                            {datasetInfo.missing_values}
                        </td>

                    </tr>

                    <tr>

                        <td className="py-3 font-semibold">
                            Duplicates
                        </td>

                        <td>
                            {datasetInfo.duplicates}
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}

export default ReportTable;