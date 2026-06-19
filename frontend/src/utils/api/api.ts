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

    // Never retry the refresh endpoint itself — avoids infinite loops
    const isRefreshRequest = (original?.url as string | undefined)?.includes("/members/refresh");

    if (status === 401 && !original._retry && !isRefreshRequest) {
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

        // Restore adminUser if the refresh response includes role info
        if (res.data.adminId && res.data.role) {
          AuthBridge.setAdminUser({ id: res.data.adminId, role: res.data.role });
        }

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
