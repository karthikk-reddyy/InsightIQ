function BusinessInsights({ datasetInfo }) {

    if (!datasetInfo) return null;

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">

                Business Insights

            </h2>

            <ul className="space-y-3 list-disc ml-5">

                <li>
                    Dataset contains <b>{datasetInfo.rows}</b> records.
                </li>

                <li>
                    Total columns: <b>{datasetInfo.columns}</b>.
                </li>

                <li>
                    Duplicate records: <b>{datasetInfo.duplicates}</b>.
                </li>

                <li>
                    Missing values: <b>{datasetInfo.missing_values}</b>.
                </li>

                <li>
                    Numeric Columns: <b>{datasetInfo.numeric_columns.length}</b>.
                </li>

                <li>
                    Categorical Columns: <b>{datasetInfo.categorical_columns.length}</b>.
                </li>

            </ul>

        </div>

    );

}

export default BusinessInsights;