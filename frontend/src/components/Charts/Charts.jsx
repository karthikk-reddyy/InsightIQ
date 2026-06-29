import BarChartComponent from "./BarChart";
import LineChartComponent from "./LineChart";

function Charts({ data }) {

    if (!data || data.length === 0)
        return null;

    return (

        <div className="mt-8">

            <h2 className="text-2xl font-bold mb-6">

                Analytics Dashboard

            </h2>

            <div className="grid grid-cols-2 gap-6">

                <BarChartComponent
                    data={data}
                />

                <LineChartComponent
                    data={data}
                />

            </div>

        </div>

    );

}

export default Charts;