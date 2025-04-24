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

const WeeklyCharts = ({ data }) => {
  return (
    <div className="my-14 mx-auto max-w-[1600px]">
      {/* Title */}
      <h2 className="text-center text-5xl font-bold mt-12 mb-12 text-[#328E6E]">
        Weekly Macronutrient Intake
      </h2>

      {/* Bigger Chart */}
      <ResponsiveContainer width="100%" height={700}>
        <BarChart
          data={data}
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

          <YAxis tick={{ fill: "#328E6E", fontSize: 22, fontWeight: 600 }}>
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
