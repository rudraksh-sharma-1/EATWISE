import UserInputForm from "./UserInputForm";
import WeeklyCharts from "./WeeklyCharts";
import MacroPieChart from "./MacroPieChart";
import RecommendationList from "./RecommendationList";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { RetroGrid } from "@/components/magicui/retro-grid";
import React, { useState } from "react";

function MainPage() {
    const [recommendationData, setRecommendationData] = useState(null);
  
    const handleRecommendations = (data) => {
      setRecommendationData(data);
    };
  
    return (
      <div className="App bg-[#E1EEBC]">
        <div className="relative min-h-screen bg-[#E1EEBC] text-white px-4 pt-10 pb-16">
  {/* Header */}
  <div className="relative h-[700px] flex flex-col items-center justify-center z-10">
    <div className="absolute inset-0 w-full">
        <RetroGrid />
      </div>
    <h1 className="text-[color:#328E6E] text-6xl font-bold relative z-10 text-center leading-tight">
      <span>Nutrition</span>
      <br />
      <LineShadowText className="text-9xl text-[color:#328E6E]">Planner</LineShadowText>
    </h1>
  </div>
  <UserInputForm onReceiveData={handleRecommendations} />
  {recommendationData && (
    <>
      <MacroPieChart macroData={recommendationData.macronutrient_distribution} />
      <WeeklyCharts data={recommendationData.weekly_charts} />
      <RecommendationList recommendations={recommendationData} />
    </>
  )}
  </div>
  </div>
    );
  }
  
  export default MainPage;
  