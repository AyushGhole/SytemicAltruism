import axios from "axios";

const API_URL = "https://sytemicaltruism-backend.onrender.com/api/auth";

// User Signup
export const signup = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, userData);
    return res.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Signup failed" };
  }
};

// User Login
export const login = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/login`, userData);
    return res.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Login failed" };
  }
};
