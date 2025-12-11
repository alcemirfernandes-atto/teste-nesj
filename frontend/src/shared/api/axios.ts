import axios from "axios";
import { parseCookies } from "nookies";

export const apiPublic = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiPrivate = axios.create({
  baseURL: "http://localhost:3000",
});

apiPrivate.interceptors.request.use((config) => {
  const cookies = parseCookies();
  const token = cookies.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiPrivate.interceptors.request.use((config) => {
  const cookies = parseCookies();
  const token = cookies.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
