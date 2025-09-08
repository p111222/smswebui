
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthStore } from "../../Store/authStore";
import { useKeycloak } from "@react-keycloak/web";
import { navigateToUserPage } from "./services/loginService";
import moment from "moment";
import GifLoading from "../../Common Components/GifLoading.jsx";
import { AppStore } from "../../Store/appStore.jsx";

const ALLOWED_TABS = [
  "Add To Favourites",
  "Task Board",
  "Approval Audit Log",
  "Customer Approved Records"
];

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser, setAccessToken } = useContext(AuthStore);
  const { keycloak, initialized } = useKeycloak();
  const { loading, setLoading } = useContext(AppStore);

  function decodeJWT(token) {
    try {
      const [header, payload, signature] = token.split(".");
      const decode = (str) =>
        JSON.parse(atob(str.replace(/-/g, "+").replace(/_/g, "/")));
      return {
        header: decode(header),
        payload: decode(payload),
        signature,
      };
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return {};
    }
  }

  useEffect(() => {
    if (!initialized) {
      setLoading(true);
      return;
    }

    if (keycloak.authenticated) {
      setLoading(true);
      try {
        const { payload } = decodeJWT(keycloak.token);

        
        
        const userType = (payload.groups?.[0]?.replace(/\//g, '') || '').toLowerCase();
        
        const allPageAccess = payload.resource_access?.sib?.roles || [];
        const pageAccess = allPageAccess.filter(role =>
          ALLOWED_TABS.includes(role)
        ).sort((a, b) =>
          ALLOWED_TABS.indexOf(a) - ALLOWED_TABS.indexOf(b)
        );
        
        console.log("Filtered pageAccess:", payload);
        console.log("payload", payload);

        if (pageAccess.length === 0) {
          console.warn("User has no access to any allowed tabs");
        }

        const userPayload = {
          id: payload.sub,
          sessionId: payload.sid,
          userName: payload.name,
          userEmail: payload.email,
          userType: userType,
          lastLogin: moment.unix(payload.auth_time).format("DD-MM-YYYY HH:mm:ss"),
          pageAccess: pageAccess,
          allPageAccess: allPageAccess
        };

        setUser(userPayload);
        setAccessToken(keycloak.token);

        if (pageAccess.length > 0) {
          navigateToUserPage(userType, pageAccess[0], navigate);
        }
      } catch (error) {
        console.error("Error during authentication:", error);
      } finally {
        setLoading(false); 
      }
    } else {
      keycloak.login();
    }
  }, [initialized, keycloak, navigate, setUser, setAccessToken]);

  useEffect(() => {
    if (user?.userType && user?.pageAccess?.length > 0) {
      setLoading(false);
      navigateToUserPage(user.userType, user.pageAccess[0], navigate);
    }
  }, [user, navigate]);

  return <GifLoading />;
};

export default Login;