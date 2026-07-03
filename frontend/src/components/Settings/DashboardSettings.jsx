import { useDataset } from "../../context/DatasetContext";

function DashboardSettings() {

    const {

        defaultChart,
        setDefaultChart

    } = useDataset();

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

                📊 Dashboard Settings

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>

                    <label className="block font-semibold mb-2">

                        Default Chart

                    </label>

                    <select

                        value={defaultChart}

                        onChange={(e)=>setDefaultChart(e.target.value)}

                        className="w-full border rounded-xl p-3"

                    >

                        <option value="Bar">Bar Chart</option>

                        <option value="Line">Line Chart</option>

                        <option value="Pie">Pie Chart</option>

                        <option value="Scatter">Scatter Plot</option>

                    </select>

                </div>

                <div>

                    <label className="block font-semibold mb-2">

                        Current Default

                    </label>

                    <div className="border rounded-xl p-3 bg-gray-100">

                        {defaultChart}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardSettings;