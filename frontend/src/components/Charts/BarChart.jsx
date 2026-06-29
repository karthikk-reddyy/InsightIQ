import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function BarChartComponent({ data }) {

  if (!data || data.length === 0) return null;

  // Group Sales by Product
  const grouped = {};

  data.forEach((row) => {

    const product = row.Product;

    const sales = Number(row.Sales);

    if (!grouped[product]) {

      grouped[product] = 0;

    }

    grouped[product] += sales;

  });

  const chartData = Object.keys(grouped).map((product) => ({

    Product: product,

    Sales: grouped[product],

  }));

  return (

    <div className="bg-white rounded-2xl shadow-lg mt-8 p-6">

      <h2 className="text-2xl font-bold mb-6">

        Sales by Product

      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="Product" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="Sales"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default BarChartComponent;