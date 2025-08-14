import { loaderHandler } from "./loaderHandler";

const skipLoaderEndpoints = new Set(["api/test", "api/users", "api/dev"]);
const pendingRequests = new Map(); // Map for potential timestamps / tracking

// Helper to create consistent request keys
const getRequestKey = (method, url) => `${method?.toLowerCase()}:${url}`;

export const setupAxiosInterceptors = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const requestKey = getRequestKey(config.method, config.url);

      // Block duplicates
      if (pendingRequests.has(requestKey)) {
        console.warn(`Duplicate request blocked: ${requestKey}`);
        return Promise.reject("Duplicate request prevented");
      }

      // Mark as pending (store timestamp for cleanup if needed)
      pendingRequests.set(requestKey, Date.now());

      // Determine loader behavior once
      const shouldSkipLoader = [...skipLoaderEndpoints].some((endpoint) =>
        config.url?.includes(endpoint)
      );
      config.metadata = { shouldSkipLoader, requestKey };

      if (!shouldSkipLoader) loaderHandler.show();

      // Set token once per request
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      loaderHandler.hide();
      return Promise.reject(error);
    }
  );

  apiInstance.interceptors.response.use(
    (response) => {
      const { requestKey, shouldSkipLoader } = response.config.metadata || {};
      if (requestKey) pendingRequests.delete(requestKey);

      if (!shouldSkipLoader && pendingRequests.size === 0) {
        loaderHandler.hide();
      }

      return response;
    },
    (error) => {
      const { requestKey, shouldSkipLoader } = error.config?.metadata || {};
      if (requestKey) pendingRequests.delete(requestKey);

      if (!shouldSkipLoader && pendingRequests.size === 0) {
        loaderHandler.hide();
      }

      return Promise.reject(error);
    }
  );

  // Optional: Periodic cleanup for stale requests (network issues)
  setInterval(() => {
    const now = Date.now();
    for (const [key, timestamp] of pendingRequests) {
      if (now - timestamp > 30000) { // 30 sec timeout
        console.warn(`Cleaning stale request: ${key}`);
        pendingRequests.delete(key);
      }
    }
  }, 30000);
};
