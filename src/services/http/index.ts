import axios, { InternalAxiosRequestConfig } from "axios";
import { get } from "lodash";
import calculateMD5Sign from "services/helper";
import { logout } from "utils";
import cookie from "../cookie";
const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
});

http.interceptors.request.use(
  (configs: InternalAxiosRequestConfig) => {
    if (cookie.get("key")) {
      configs.headers.Key = cookie.get("key");
      configs.headers.Sign = calculateMD5Sign({
        method: configs.method!,
        body: configs.data,
        url: configs.url?.slice(0, -1)!,
      });
    }
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (get(error, "response.status") === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);
export default http;
