import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api"
});

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("gradeTrackerUser");

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    config.headers.Authorization = `Bearer ${parsedUser.token}`;
  }

  return config;
});

export default api;
