import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "tailwindcss/tailwind.css";
import { AuthStore } from "../../Store/authStore";
import { useKeycloak } from "@react-keycloak/web";
import { navigateToUserPage } from "./services/loginService";
import moment from "moment";
import arrangeArray from "../../utils/sortModules.js";
import { allPages } from "../../utils/constants.js";
import GifLoading from "../../Common Components/GifLoading.jsx";

const Login = () => {

  const navigate = useNavigate();
  const { user, setUser, setAccessToken } = useContext(AuthStore);
  const { keycloak, initialized } = useKeycloak();

  console.log(keycloak);
  console.log(initialized);

  function decodeJWT(token) {
    const [header, payload, signature] = token.split(".");
    const decode = (str) =>
      JSON.parse(atob(str.replace(/-/g, "+").replace(/_/g, "/")));
    return {
      header: decode(header),
      payload: decode(payload),
      signature,
    };
  }

  useEffect(() => {
    if (!initialized) return;

    if (keycloak.authenticated) {
      const { payload } = decodeJWT(keycloak.token);
      const sortedArr = [ "Customer Requests", "Task Board","SMS Opt-In/Out", "SMS Block Lift" , "Phone Number Addition" , "Mpin Generation" ,"Approval Audit Log", "SMS View Log"];
      console.log(payload);
      console.log(payload.realm_access.roles[0]);
      

      const userPayload = {
        id: payload.sub,
        sessionId: payload.sid,
        userName: payload.name,
        userEmail: payload.email,
        userType: payload.realm_access.roles[0],
        lastLogin: moment.unix(payload.auth_time).format("DD-MM-YYYY HH:mm:ss"),
        pageAccess: sortedArr
      };

	console.log(userPayload);
	    
      setUser(userPayload);
      setAccessToken(keycloak.token);

      navigateToUserPage(
        payload.realm_access.roles[0],
        sortedArr[0],
        navigate
      );
    } else {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  console.log("user", user);


  useEffect(() => {
    if (user && user.userType && user.pageAccess) {
      navigateToUserPage(user.userType, user.pageAccess[0], navigate);
    }
  }, [user, navigate]);


  return (
    <GifLoading />
  );
};

export default Login;
