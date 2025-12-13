import axios from "axios";
import { parseCookies } from "nookies";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_API_URL não definida");
}

export const apiPublic = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiPrivate = axios.create({
  baseURL: baseURL,
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
