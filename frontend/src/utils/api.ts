import axios from "axios";
import toast from "react-hot-toast";

const apiurl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${apiurl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
    }

    toast.error("Your session has expired. Please login again");



    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }

    if (error.response && error.response.status >= 500) {
      toast.error("Server error. Please try again later.");
    }

    if (error.message === "Network Error") {
      toast.error("Network error. Please check your connection.");
    }
    return Promise.reject(error)
  }
);

export default api