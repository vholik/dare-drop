import axios from "axios";
import { __API_URL__ } from "../consts/api";
import { REFRESH_TOKEN_LOCALSTORAGE_KEY } from "../consts/local-storage";
import { AuthResponse, setAuthData, useUserStore } from "@/entities/user";

export const $api = axios.create({
  baseURL: __API_URL__,
});

$api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const fetchRefreshToken = async (): Promise<AuthResponse> => {
  const response = await axios.get<AuthResponse>(
    `${__API_URL__}authentication/refresh`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          REFRESH_TOKEN_LOCALSTORAGE_KEY
        )}`,
      },
    }
  );

  return response.data;
};

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await fetchRefreshToken();

        setAuthData({ accessToken: response.refreshToken });
        localStorage.setItem(
          REFRESH_TOKEN_LOCALSTORAGE_KEY,
          response.refreshToken
        );

        return $api.request(originalRequest);
      } catch (e) {
        return e;
      }
    }
    throw error;
  }
);
