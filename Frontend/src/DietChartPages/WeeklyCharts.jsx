"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const chartData = [
  { day: "Mon", protein: 80, carbs: 150, fat: 60 },
  { day: "Tue", protein: 90, carbs: 140, fat: 70 },
  { day: "Wed", protein: 85, carbs: 155, fat: 65 },
  { day: "Thu", protein: 95, carbs: 160, fat: 75 },
  { day: "Fri", protein: 88, carbs: 148, fat: 68 },
  { day: "Sat", protein: 92, carbs: 152, fat: 70 },
  { day: "Sun", protein: 86, carbs: 149, fat: 66 },
];

const chartConfig = {
  protein: {
    label: "Protein",
    color: "#328E6E",
  },
  carbs: {
    label: "Carbs",
    color: "#67AE6E",
  },
  fat: {
    label: "Fat",
    color: "#DF9755",
  },
};

const WeeklyCharts = () => {
  return (
    <div className="my-14 mx-auto max-w-[1600px]">
      {/* Title */}
      <h2 className="text-center text-5xl font-bold mt-12 mb-12 text-[#328E6E]">
        Weekly Macronutrient Intake
      </h2>

      {/* Bigger Chart */}
      <ResponsiveContainer width="100%" height={700}>
        <BarChart
          data={chartData}
          margin={{ top: 30, right: 40, left: 40, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="day"
            tick={{ fill: "#328E6E", fontSize: 22, fontWeight: 600 }}
            interval={0}
            label={{
              value: "Day",
              position: "bottom",
              offset: 20,
              style: {
                fill: "#328E6E",
                fontSize: 28,
                fontWeight: 600,
              },
            }}
          />

          <YAxis
            tick={{ fill: "#328E6E", fontSize: 22, fontWeight: 600 }}
          >
            <Label
              value="Grams"
              angle={-90}
              position="insideLeft"
              style={{ fill: "#328E6E", fontSize: 28 }}
            />
          </YAxis>

          <Tooltip
            contentStyle={{
              backgroundColor: "#F6FBE3",
              borderColor: "#328E6E",
              fontSize: "20px",
            }}
            labelStyle={{ color: "#328E6E", fontWeight: "600" }}
            itemStyle={{ color: "#333" }}
          />
          <Legend
            wrapperStyle={{
              fontSize: "24px",
              color: "#333",
              paddingTop: "55px",
              fontWeight: "600",
            }}
          />

          {/* Bars */}
          {Object.keys(chartConfig).map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={chartConfig[key].color}
              name={chartConfig[key].label}
              barSize={50}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyCharts;
