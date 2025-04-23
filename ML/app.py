from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from scipy.optimize import linprog
import os
import random

app = Flask(__name__)
CORS(app)

# Load only the generated Indian food dataset
generated_file = os.path.join(os.path.dirname(__file__), "indian_food_data.csv")
generated_df = pd.read_csv(generated_file)
generated_df = pd.read_csv(generated_file)

# ✅ Drop exact duplicate rows
generated_df.drop_duplicates(inplace=True)

# ✅ Drop duplicate food names (keep the first unique one)
generated_df.drop_duplicates(subset="food", keep="first", inplace=True)

# 🔁 Optional: Reset index for clean dataframe
generated_df.reset_index(drop=True, inplace=True)

# Optional: Add source tag for future tracking
generated_df["source"] = "indian"

# Use only the generated dataset for now
combined_df = generated_df.copy()

# Clean and prepare the data
combined_df.drop_duplicates(subset="food", keep="first", inplace=True)
combined_df.dropna(inplace=True)
combined_df.reset_index(drop=True, inplace=True)

# Final filtered dataset
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
    return bmr * activity_multipliers.get(activity_level.lower(), 1.2)

# ----------------- API Endpoint -----------------
@app.route("/recommendations", methods=["POST"])
def get_recommendations():
    user_data = request.json
    daily_calories = calculate_calories(
        age=int(user_data["age"]),
        gender=user_data["gender"],
        weight=float(user_data["weight"]),
        height=float(user_data["height"]),
        activity_level=user_data["activityLevel"]
    )

    # Adaptive macro distribution
    activity = user_data["activityLevel"].lower()
    if activity == "extra active":
        protein_ratio = 0.45
        carb_ratio = 0.35
    elif activity == "sedentary":
        protein_ratio = 0.35
        carb_ratio = 0.45
    else:
        protein_ratio = 0.4
        carb_ratio = 0.4
    fat_ratio = 1.0 - protein_ratio - carb_ratio

    # Calorie split across meals
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
            meal_filtered = data[data["meal_type"] == meal]
            if len(meal_filtered) < 10:
                  meal_filtered = data  # fallback if not enough options
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
            "day": day,
            "protein": round((daily_calories * protein_ratio) / 4 + random.uniform(-5, 5), 2),
            "carbs": round((daily_calories * carb_ratio) / 4 + random.uniform(-5, 5), 2),
            "fat": round((daily_calories * fat_ratio) / 9 + random.uniform(-2, 2), 2)
        }
        for day in ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
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
