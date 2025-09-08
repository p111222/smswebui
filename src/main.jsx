import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthStoreProvider } from "./Store/authStore.jsx";
import { AppStoreProvider } from "./Store/appStore.jsx";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak/keycloak.jsx";
import { FavoritesProvider } from "./Store/FavoritesContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ReactKeycloakProvider
    // keycloak={keycloak}
    authClient={keycloak}
    initConfig={{
      onLoad: "login-required",
      checkLoginIframe: false, // Disable iframe check to avoid issues
    }}
  >
    <AuthStoreProvider>
      <AppStoreProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </AppStoreProvider>
    </AuthStoreProvider>
  </ReactKeycloakProvider>
  // </StrictMode>
);
