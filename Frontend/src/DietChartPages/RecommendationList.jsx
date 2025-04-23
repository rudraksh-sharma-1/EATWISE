import React from "react";

const RecommendationList = ({ recommendations }) => {
  if (!recommendations || !recommendations.recommended_foods) {
    return <p>No recommendations yet. Fill out the form to get started!</p>;
  }

  const { caloric_needs, macronutrient_distribution, recommended_foods } = recommendations;

  return (
    <div>
      <h2>Personalized Nutrition Recommendations</h2>

      <h3>Caloric and Macronutrient Needs</h3>
      <p><strong>Daily Caloric Needs:</strong> {caloric_needs} kcal</p>
      <p><strong>Protein:</strong> {macronutrient_distribution.protein}g</p>
      <p><strong>Carbs:</strong> {macronutrient_distribution.carbs}g</p>
      <p><strong>Fat:</strong> {macronutrient_distribution.fat}g</p>

      <h3>Meal Plan</h3>
      {["breakfast", "lunch", "dinner"].map((mealType) => (
        <div key={mealType}>
          <h4>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h4>
          <ul>
            {recommended_foods[mealType] && recommended_foods[mealType].length > 0 ? (
              recommended_foods[mealType].map((item, index) => (
                <li key={index}>
                  <strong>{item.food}</strong> — {item.calories} kcal, Protein: {item.protein}g, Carbs: {item.carbs}g, Fat: {item.fat}g
                </li>
              ))
            ) : (
              <li>No recommendations for this meal</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RecommendationList;
