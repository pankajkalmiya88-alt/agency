// src/api/createApiInstance.js
import axios from "axios";
import { setupAxiosInterceptors } from "./axiosInterceptor";

export const createApiInstance = (baseURL) => {
  const apiInstance = axios.create({
    baseURL,
    timeout: 10000,
  });

  // Attach common interceptors
  setupAxiosInterceptors(apiInstance);

  return apiInstance;
};