
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

function PieChartComponent({ datasetInfo }) {

  if (!datasetInfo) return null;

  const data = [
    { name: "Rows", value: datasetInfo.rows },
    { name: "Columns", value: datasetInfo.columns },
    { name: "Missing", value: datasetInfo.missing_values },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#EF4444"];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-4">
        Dataset Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default PieChartComponent;

