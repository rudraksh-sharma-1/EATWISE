import React from "react"
import {
  RadialBarChart,
  RadialBar,
  PolarRadiusAxis,
  Label,
} from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowRight } from "lucide-react"

const COLORS = ["#328E6E", "#5B9F5A", "#DF9755"]

const RecommendationList = ({ recommendations }) => {
  if (!recommendations || !recommendations.recommended_foods) {
    return <p>No recommendations yet. Fill out the form to get started!</p>
  }

  const { caloric_needs, macronutrient_distribution, recommended_foods } =
    recommendations

  const chartData = [
    { name: "Protein", value: macronutrient_distribution.protein },
    { name: "Carbs", value: macronutrient_distribution.carbs },
    { name: "Fat", value: macronutrient_distribution.fat },
  ]

  const chartConfig = {
    protein: { label: "Protein", color: COLORS[0] },
    carbs: { label: "Carbs", color: COLORS[1] },
    fat: { label: "Fat", color: COLORS[2] },
  }

  const mealIcons = {
    breakfast: "🍳",
    lunch: "🥗",
    dinner: "🍽️",
  }

  return (
    <div className="bg-[#E1EEBC] p-6">
      <h2 className="text-center text-5xl font-bold mb-12 text-[#328E6E]">
        Personalized Nutrition Recommendations
      </h2>

      <h3 className="text-3xl font-bold flex items-center gap-2 text-[#EB5A3C] mb-8">
        <ArrowRight className="h-7 w-7" />
        Caloric and Macronutrient Needs
      </h3>

      <p className="text-2xl text-[#333] font-semibold mb-8">
        <strong>Daily Caloric Needs:</strong>{" "}
        <span className="text-[#328E6E]">{caloric_needs} kcal</span>
      </p>
      <p style={{ color: "gray", fontSize: "14px" }}>
  *Your recommended intake is based on your body’s energy needs, activity level, and BMI.
  {` ${recommendations.caloric_needs} kcal may look high, but it is suitable for your body and lifestyle to stay healthy.`}
</p>


      <div className="flex justify-center gap-16 flex-wrap">
        {["protein", "carbs", "fat"].map((key) => (
          <div key={key} className="flex flex-col items-center">
            <h4 className="text-2xl text-[#328E6E] mb-4 font-semibold">
              {chartConfig[key].label}
            </h4>
            <RadialBarChart
              width={250}
              height={250}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={18}
              data={[
                {
                  name: chartConfig[key].label,
                  value: chartData.find(
                    (d) => d.name.toLowerCase() === key
                  ).value,
                  fill: chartConfig[key].color,
                },
              ]}
            >
              <RadialBar
                dataKey="value"
                background
                clockWise
                cornerRadius={12}
              />
              <RadialBar
                dataKey="value"
                clockWise
                cornerRadius={12}
                fill={chartConfig[key].color}
              />
              <PolarRadiusAxis tick={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const value = chartData.find(
                        (d) => d.name.toLowerCase() === key
                      ).value
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-[#0F172A] text-3xl font-bold"
                          >
                            {value}
                          </tspan>
                        </text>
                      )
                    }
                    return null
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </div>
        ))}
      </div>

      <h3 className="text-3xl font-bold flex items-center gap-2 text-[#EB5A3C] mt-14 mb-8">
        <ArrowRight className="h-7 w-7" />
        Meal Plan
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {["breakfast", "lunch", "dinner"].map((mealType) => (
          <div
            key={mealType}
            className="bg-[#F6FBE3] rounded-xl shadow-md p-4"
          >
            <h4 className="text-2xl font-semibold text-[#328E6E] mb-4 capitalize flex items-center gap-2">
              <span>{mealIcons[mealType]}</span> {mealType}
            </h4>
            {recommended_foods[mealType] &&
            recommended_foods[mealType].length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[#328E6E] text-[18px] font-semibold">
                      Food
                    </TableHead>
                    <TableHead className="text-[#328E6E] text-[18px] font-semibold">
                      Cals
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recommended_foods[mealType].map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-[18px] font-medium text-[#333]">
                        {item.food}
                      </TableCell>
                      <TableCell className="text-[18px] font-medium text-[#333]">
                        {item.calories}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-[#666]">No recommendations for this meal</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendationList
