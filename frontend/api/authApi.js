import axios from "axios";

const API_URL = "http://localhost:3000"; // backend base URL

// Signup
export const signup = (data) => axios.post(`${API_URL}/auth/signup`, data);

// Login
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);
