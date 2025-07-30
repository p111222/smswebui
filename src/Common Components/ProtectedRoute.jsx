import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthStore } from "../Store/authStore.jsx";
import BackOfficeLayout from "../Layout/BackOfficeLayout.jsx";
import ItAdminLayout from "../Layout/ItAdminLayout.jsx";
import { useKeycloak } from "@react-keycloak/web";
import GifLoading from "./GifLoading.jsx";

const ProtectedRoute = ({ children, layout: Layout }) => {
  const { user } = useContext(AuthStore);
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) return <GifLoading />;

  if (!keycloak.authenticated) {
    keycloak.login();
    return <GifLoading />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }else if (
    user.userType === "backOfficeUser" &&
    Layout === BackOfficeLayout
  ) {
    return children;
  } else if (user.userType === "itSupport" && Layout === ItSupportLayout) {
    return children;
  } else if (user.userType === "branchMaker" && Layout === BranchLayout) {
    return children;
  } else if (user.userType === "useradmin" && Layout === ItAdminLayout) {
    return children;
  } else if (
    user.userType === "grievanceRedressal" &&
    Layout === GrievanceRedressalLayout
  ) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
