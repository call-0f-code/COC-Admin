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
    const status = error?.response?.status;

    if (status === 401) {
     
      toast.error("Your session has expired. Please login again");
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
      return Promise.reject(error);
    }

    if (status >= 500) {
      toast.error("Server error. Please try again later.");
    } else if (!error.response || error.code === "ERR_NETWORK") {
      toast.error("Network error. Please check your connection.");
    } else if (status === 400) {
      const msg = error.response.data?.message || "Bad request.";
      toast.error(msg);
    }
    return Promise.reject(error);
  }
);

export default api