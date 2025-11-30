import axios from "axios";
import { AuthBridge } from "./authBridge";
import { globalToast as toast } from "../toast";

let isRefreshing = false;
let refreshQueue: ((t: string) => void)[] = [];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = AuthBridge.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;
    const original = error.config;

    if (status === 401 && !original._retry) {
      original._retry = true;

      // If refresh is in progress, wait
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((newToken) => {
            original.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(original));
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await api.post("/members/refresh");
        const newToken = res.data.token;

        AuthBridge.setToken(newToken);

        isRefreshing = false;
        refreshQueue.forEach((cb) => cb(newToken));
        refreshQueue = [];

        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (err) {
        isRefreshing = false;
        refreshQueue = [];
        toast.error("Session expired.");
        AuthBridge.logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
