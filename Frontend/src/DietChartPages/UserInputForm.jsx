import React, { useState } from "react";

const UserInputForm = ({ onReceiveData }) => {
  const [form, setForm] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activityLevel: "moderately active",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const validateForm = () => {
    const { age, weight, height } = form;
    if (!age || !weight || !height) return "All fields are required.";
    if (age <= 0 || weight <= 0 || height <= 0)
      return "Age, weight, and height must be positive numbers.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      onReceiveData(data);
    } catch (err) {
      setError("Failed to fetch recommendations. Make sure backend is running.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-lg bg-gray-100 shadow-md"
    >
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="number"
        name="weight"
        placeholder="Weight (kg)"
        value={form.weight}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="number"
        name="height"
        placeholder="Height (cm)"
        value={form.height}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        name="activityLevel"
        value={form.activityLevel}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="sedentary">Sedentary</option>
        <option value="lightly active">Lightly Active</option>
        <option value="moderately active">Moderately Active</option>
        <option value="very active">Very Active</option>
        <option value="extra active">Extra Active</option>
      </select>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <button
        type="submit"
        className="w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded text-base uppercase hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Get Recommendations
      </button>
    </form>
  );
};

export default UserInputForm;
