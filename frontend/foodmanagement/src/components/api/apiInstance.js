import axios from "axios";

const API_BASE_URL = "http://192.168.147.89:8080"; // Default to localhost if env var not set

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
