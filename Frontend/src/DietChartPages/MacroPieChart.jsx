import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
} from "recharts";

// Custom color palette
const COLORS = ["#328E6E", "#67AE6E", "#DF9755"];

const MacroPieChart = ({ macroData }) => {
  const data = [
    { name: "Protein", value: macroData.protein },
    { name: "Carbs", value: macroData.carbs },
    { name: "Fat", value: macroData.fat },
  ];

  const trendData = [
    { day: "Mon", protein: 80, carbs: 150, fat: 60 },
    { day: "Tue", protein: 90, carbs: 140, fat: 70 },
    { day: "Wed", protein: 85, carbs: 155, fat: 65 },
    { day: "Thu", protein: 95, carbs: 160, fat: 75 },
    { day: "Fri", protein: 88, carbs: 148, fat: 68 },
  ];

  return (
    <div className=" my-14 mx-auto max-w-7xl">
      <h2 className="text-center text-5xl font-bold mt-12 mb-12 text-[#328E6E]">
        Daily Macronutrient Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-14">
        {/* Pie Chart */}
        <div className="md:col-span-5 h-[480px] flex flex-col items-center">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={160}
                label={({ value }) => `${value}g`}
                labelLine={false}
                stroke="#fff"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F6FBE3",
                  borderColor: "#328E6E",
                  fontSize: "20px",
                }}
                labelStyle={{ color: "#328E6E", fontWeight: "600" }}
                itemStyle={{ color: "#333" }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Pie Chart Legend */}
          <div className="flex gap-8 text-[20px] text-[#333] font-semibold">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="inline-block w-5 h-5 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Line Chart */}
        <div className="md:col-span-7 flex flex-col items-center">
          {/* Make the line chart container wider */}
          <div className="w-full" style={{ maxWidth: "100%", height: "500px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{ top: 30, right: 30, left: 30, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#328E6E", fontSize: 18, fontWeight: 600 }}
                  interval={0}
                >
                  <Label
                    value="Day"
                    offset={20}
                    position="bottom"
                    style={{
                      fill: "#328E6E",
                      fontSize: 24,
                      fontWeight: 600,
                    }}
                  />
                </XAxis>
                <YAxis
                  tick={{ fill: "#328E6E", fontSize: 18, fontWeight: 600 }}
                >
                  <Label
                    value="Grams"
                    angle={-90}
                    position="insideLeft"
                    style={{
                      fill: "#328E6E",
                      fontSize: 24,
                      fontWeight: 600,
                    }}
                  />
                </YAxis>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#F6FBE3",
                    borderColor: "#328E6E",
                    fontSize: "16px",
                  }}
                  labelStyle={{ color: "#328E6E", fontWeight: "600" }}
                  itemStyle={{ color: "#333" }}
                />
                <Line
                  type="monotone"
                  dataKey="protein"
                  stroke="#328E6E"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="carbs"
                  stroke="#5B9F5A"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="fat"
                  stroke="#DF9755"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart Legend */}
          <div
            className="flex gap-8"
            style={{
              fontSize: "22px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-5 h-5 rounded-full bg-[#328E6E]"></span>
              Protein
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-5 h-5 rounded-full bg-[#5B9F5A]"></span>
              Carbs
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-5 h-5 rounded-full bg-[#DF9755]"></span>
              Fat
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroPieChart;
