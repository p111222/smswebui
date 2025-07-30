import { useEffect, useContext } from "react";
import { makeRequest } from "../Axios";
import { useKeycloak } from "@react-keycloak/web"; // Assuming you are using the Keycloak React SDK
import { AuthStore } from "../Store/authStore.jsx";
import signData from "../utils/signData.js";
import { object } from "zod";

const useAxiosPrivate = () => {
  const { keycloak, initialized } = useKeycloak(); // Getting the Keycloak instance
  const { setSessionValidity } = useContext(AuthStore);

  useEffect(() => {
    // Make sure Keycloak is initialized before proceeding
    if (!initialized || !keycloak.authenticated) return;

    const requestIntercept = makeRequest.interceptors.request.use(
      async (config) => {
        if (config.url && config.url.includes("auth")) {
          // Skip adding token for authentication-related requests
          return config;
        }

        try {
          // Ensure Keycloak is initialized and get the current access token
          if (keycloak.token) {
            config.headers["token"] = `${keycloak.token}`;
          }

          function sortObj(obj) {
            if (obj === null || typeof obj !== 'object') {
              return obj;
            }

            if (Array.isArray(obj)) {
              return obj.map(sortObj);
            }

            return Object.keys(obj).sort().reduce((result, key) => {
              result[key] = sortObj(obj[key]);
              return result;
            }, {});
          }

          // const canonicalJson = config.data ? JSON.parse(JSON.stringify(config.data), Object.keys(config.data).sort()) : {}

          const validationData = {
            body: config.data ? config.data : {},
            uri: import.meta.env.VITE_CONTEXT_PATH + config.url
          }

          console.log("validationData", JSON.stringify(validationData));


          signData(validationData)
            .then((data) => config.headers["chubsk"] = data)
            .catch((err) => console.log(err))


          console.log("config", JSON.stringify(config));

          return config;
        } catch (error) {
          console.error("Failed to attach token", error);
          throw error;
        }
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = makeRequest.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // Handle 401 or 403 (token expired or unauthorized)
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;

          try {
            // Attempt to refresh the token using Keycloak
            const refreshed = await keycloak.updateToken(30); // Refresh token if less than 30 seconds from expiration

            if (refreshed) {
              // If token was refreshed, retry the request with the new token
              prevRequest.headers["token"] = `${keycloak.token}`;
              return makeRequest(prevRequest);
            } else {
              console.error("Keycloak token update failed");
              // Handle refresh failure (e.g., redirect to login)
            }
          } catch (refreshError) {
            console.error("Error refreshing token", refreshError);
            // Handle token refresh failure (e.g., redirect to login)
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      makeRequest.interceptors.request.eject(requestIntercept);
      makeRequest.interceptors.response.eject(responseIntercept);
    };
  }, [keycloak, initialized]);

  return makeRequest;
};

export default useAxiosPrivate;
