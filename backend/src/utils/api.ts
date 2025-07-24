import axios from "axios";
import { ApiError } from "./apiError";
import { APIError } from "better-auth";

const apiurl = process.env.API_URL;

const api = axios.create({
  baseURL: `${apiurl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
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
    
    // Handle 500 server errors
    if (error.response && error.response.status >= 500) {
      throw new ApiError('Internal Server Error', 500);
    }

    if(error.response && error.response.status === 400) {
        throw new ApiError('Bad Request', 400);
    }

    return Promise.reject(error)
  }
);

export default api