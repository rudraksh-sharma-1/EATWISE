import UserInputForm from "./UserInputForm";
import WeeklyCharts from "./WeeklyCharts";
import MacroPieChart from "./MacroPieChart";
import RecommendationList from "./RecommendationList";
import React, { useState } from "react";

function MainPage() {
    const [recommendationData, setRecommendationData] = useState(null);
  
    const handleRecommendations = (data) => {
      setRecommendationData(data);
    };
  
    return (
      <div className="App">
        <h1>Nutrition Planner</h1>
        <UserInputForm onReceiveData={handleRecommendations} />
  
        {recommendationData && (
          <>
            <MacroPieChart macroData={recommendationData.macronutrient_distribution} />
            <WeeklyCharts data={recommendationData.weekly_charts} />
            <RecommendationList recommendations={recommendationData} />
          </>
        )}
      </div>
    );
  }
  
  export default MainPage;
  