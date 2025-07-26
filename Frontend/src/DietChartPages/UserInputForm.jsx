import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShineBorder } from "@/components/magicui/shine-border";

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
    setError("");
  };

  const handleSelectChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setError("");
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
      const res = await fetch("https://eatwise-1.onrender.com/recommendations", {
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
    <div className="flex justify-center">
      <div className="max-w-lg w-full">
        {/* Card structure with ShineBorder applied on top of the Card */}
        <div className="relative">
          <ShineBorder
            shineColor={["#90C67C","#67AE6E","#328E6E","#A0C878","#DF9755","#EB5A3C",]}
            className="absolute inset-0 z-20 rounded-2xl" // Apply a higher z-index to ShineBorder
          />
          <Card className="bg-[#E1EEBC] p-2 text-black shadow-[0_10px_40px_rgba(0,0,0,0.6)] rounded-2xl relative z-10">
            <CardContent className="space-y-8 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Age input */}
                <div>
                  <Label htmlFor="age" className="text-[#EB5A3C] mb-2 font-bold text-2xl">
                    Age
                  </Label>
                  <Input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    value={form.age}
                    onChange={handleChange}
                    className="bg-white py-3 px-4 text-lg"
                  />
                </div>

                {/* Gender select */}
                <div>
                  <Label className="text-[#EB5A3C] mb-2 font-bold text-2xl">Gender</Label>
                  <Select
                    value={form.gender}
                    onValueChange={(val) => handleSelectChange("gender", val)}
                  >
                    <SelectTrigger className="bg-white py-3 px-4 text-lg">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Weight input */}
                <div>
                  <Label htmlFor="weight" className="text-[#EB5A3C] mb-2 font-bold text-2xl">
                    Weight (kg)
                  </Label>
                  <Input
                    type="number"
                    id="weight"
                    name="weight"
                    placeholder="Enter your weight"
                    value={form.weight}
                    onChange={handleChange}
                    className="bg-white py-3 px-4 text-lg"
                  />
                </div>

                {/* Height input */}
                <div>
                  <Label htmlFor="height" className="text-[#EB5A3C] mb-2 font-bold text-2xl">
                    Height (cm)
                  </Label>
                  <Input
                    type="number"
                    id="height"
                    name="height"
                    placeholder="Enter your height"
                    value={form.height}
                    onChange={handleChange}
                    className="bg-white py-3 px-4 text-lg"
                  />
                </div>

                {/* Activity level select */}
                <div>
                  <Label className="text-[#EB5A3C] font-bold mb-2 text-2xl">Activity Level</Label>
                  <Select
                    value={form.activityLevel}
                    onValueChange={(val) => handleSelectChange("activityLevel", val)}
                  >
                    <SelectTrigger className="bg-white py-3 px-4 text-lg">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="lightly active">Lightly Active</SelectItem>
                      <SelectItem value="moderately active">Moderately Active</SelectItem>
                      <SelectItem value="very active">Very Active</SelectItem>
                      <SelectItem value="extra active">Extra Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Error message */}
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

                {/* Submit button */}
                <div className="mt-10">
                  <Button
                    type="submit"
                    className="w-full py-3 bg-[#328E6E] text-white hover:bg-[#276F58] text-lg"
                  >
                    Get Recommendations
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserInputForm;
