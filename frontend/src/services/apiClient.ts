import axios from "axios";

const apiClient = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000"
      : "https://api.example.com",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
