import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function LineChartComponent({ data }) {

  if (!data || data.length === 0) return null;

  // Create line chart data
  const chartData = data.map((row) => ({

    Date: row.Date,

    Sales: Number(row.Sales),

  }));

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">

        Sales Trend

      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="Date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="Sales"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default LineChartComponent;