import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Tooltip } from "antd";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: chartData = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get("/stats");
      return res.data;
    },
    queryKey: ["chartData"],
  });
  const COLORS = ["#0088FE", "#FF8042"];
  console.log(chartData);
  return (
    <div>
      <Helmet>
        <title>Stats</title>
      </Helmet>
      <div>
        <h2 className="text-xl font-bold">User and application ratio:</h2>
        <ResponsiveContainer width="60%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
