import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthStore } from "../Store/authStore.jsx";
import BackOfficeLayout from "../Layout/BackOfficeLayout.jsx";
import ItAdminLayout from "../Layout/ItAdminLayout.jsx";
import { useKeycloak } from "@react-keycloak/web";
import GifLoading from "./GifLoading.jsx";
import { AppStore } from "../Store/appStore.jsx";

const ProtectedRoute = ({ children, layout: Layout }) => {
  const { user } = useContext(AuthStore);
  const { loading, setLoading } = useContext(AppStore);
  const { keycloak, initialized } = useKeycloak();

  console.log("initialized" + initialized);

  if (!initialized) {
    setLoading(true);
    return <GifLoading />
  };

  if (!keycloak.authenticated) {
    setLoading(true);
    keycloak.login();
    return <GifLoading />;
  }

  if (!user) {

    return <Navigate to="/" />;
  } else if (

    user.userType === "backOfficeUser" &&
    Layout === BackOfficeLayout
  ) {
    setLoading(false);
    return children;
  } else if (user.userType === "itSupport" && Layout === ItSupportLayout) {
    setLoading(false);
    return children;
  } else if (user.userType === "branchuser" && Layout === BackOfficeLayout) {
    setLoading(false);
    return children;
  } else if (user.userType === "useradmin" && Layout === ItAdminLayout) {
    setLoading(false);
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
