from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from scipy.optimize import linprog
import os
import random

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://majro-front.vercel.app"}})

# ----------------- Load Indian Food Dataset -----------------
generated_file = os.path.join(os.path.dirname(__file__), "indian_food_data.csv")
generated_df = pd.read_csv(generated_file)

# Clean dataset
generated_df.drop_duplicates(inplace=True)
generated_df.drop_duplicates(subset="food", keep="first", inplace=True)
generated_df.reset_index(drop=True, inplace=True)
generated_df["source"] = "indian"

# Final dataset
combined_df = generated_df.copy()
combined_df.drop_duplicates(subset="food", keep="first", inplace=True)
combined_df.dropna(inplace=True)
combined_df.reset_index(drop=True, inplace=True)
data = combined_df[["food", "calories", "protein", "carbs", "fat", "meal_type"]]

# ----------------- Calorie Calculation -----------------
def calculate_calories(age, gender, weight, height, activity_level):
    if gender == "male":
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161

    activity_multipliers = {
        "sedentary": 1.2,
        "lightly active": 1.375,
        "moderately active": 1.55,
        "very active": 1.725,
        "extra active": 1.9,
    }
    tdee = bmr * activity_multipliers.get(activity_level.lower(), 1.2)
    return tdee

# ----------------- API Endpoint -----------------
@app.route("/recommendations", methods=["POST"])
def get_recommendations():
    user_data = request.json

    age = int(user_data["age"])
    gender = user_data["gender"]
    weight = float(user_data["weight"])
    height = float(user_data["height"])
    activity_level = user_data["activityLevel"]

    daily_calories = calculate_calories(
        age=age,
        gender=gender,
        weight=weight,
        height=height,
        activity_level=activity_level
    )

    # Calculate BMI
    bmi = weight / ((height / 100) ** 2)

    # Macronutrient ratios based on BMI
    if bmi >= 30:
        protein_ratio = 0.45
        carb_ratio = 0.30
        fat_ratio = 0.25
    elif bmi < 18.5:
        protein_ratio = 0.35
        carb_ratio = 0.50
        fat_ratio = 0.15
    else:
        if activity_level.lower() == "extra active":
            protein_ratio = 0.45
            carb_ratio = 0.35
        elif activity_level.lower() == "sedentary":
            protein_ratio = 0.35
            carb_ratio = 0.45
        else:
            protein_ratio = 0.40
            carb_ratio = 0.40
        fat_ratio = 1.0 - protein_ratio - carb_ratio

    meal_ratios = {
        "breakfast": 0.25,
        "lunch": 0.4,
        "dinner": 0.35
    }

    meals = {}

    for meal, ratio in meal_ratios.items():
        protein_target = daily_calories * protein_ratio * ratio / 4
        carb_target = daily_calories * carb_ratio * ratio / 4
        fat_target = daily_calories * fat_ratio * ratio / 9

        sample_size = 100 if daily_calories > 2200 else 80
        attempts = 0
        success = False

        while attempts < 3 and not success:
            meal_filtered = data[data["meal_type"].str.contains(meal, case=False, na=False)]
            if len(meal_filtered) < 10:
                meal_filtered = data
            subset = meal_filtered.sample(n=min(sample_size, len(meal_filtered)), random_state=random.randint(1, 9999)).reset_index(drop=True)

            nutrients = subset[['protein', 'carbs', 'fat']].values
            cost = subset['calories'].values

            A_eq = [nutrients[:, 0], nutrients[:, 1], nutrients[:, 2]]
            b_eq = [protein_target, carb_target, fat_target]
            bounds = [(0, None) for _ in range(len(cost))]

            res = linprog(cost, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method='highs')
            success = res.success
            attempts += 1

        if success:
            selected = res.x
            chosen_indices = [i for i, qty in enumerate(selected) if qty > 0]
            meals[meal] = subset.iloc[chosen_indices].to_dict(orient='records')
        else:
            fallback = subset.sort_values(by="protein", ascending=False).head(3)
            meals[meal] = fallback.to_dict(orient='records')

    weekly_distribution = [
        {
            "day": f"Week {i+1}",
            "protein": round((daily_calories * protein_ratio) / 4 + random.uniform(-5, 5), 2),
            "carbs": round((daily_calories * carb_ratio) / 4 + random.uniform(-5, 5), 2),
            "fat": round((daily_calories * fat_ratio) / 9 + random.uniform(-2, 2), 2)
        }
        for i in range(7)
    ]

    response = {
        "caloric_needs": round(daily_calories, 2),
        "macronutrient_distribution": {
            "protein": round(daily_calories * protein_ratio / 4, 2),
            "carbs": round(daily_calories * carb_ratio / 4, 2),
            "fat": round(daily_calories * fat_ratio / 9, 2)
        },
        "weekly_charts": weekly_distribution,
        "recommended_foods": meals
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
