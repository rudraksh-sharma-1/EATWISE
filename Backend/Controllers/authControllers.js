import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerUser = async (req, res) => {
  const { fullName, email, password, weight, height, activity } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    /* const apikey = process.env.ZERObounce_API_KEY;
    const response = await axios.get("https://api.zerobounce.net/v2/validate", {
      params: {
        api_key: apikey,
        email: email,
      },
    });

    const result = response.data;
    if (result.status === "valid") { */
      const user = new User({
        fullName,
        email,
        password,
        weight,
        height,
        activity,
      });
      await user.save();
      

      const token = generateToken(user);
     return res.status(201).json({ user, token });
   /*  } else {
    return  res.status(400).json({ message: "Invalid email", result });
    } */
  } catch (err) {
   return res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
