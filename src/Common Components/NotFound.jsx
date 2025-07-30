import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthStore } from "../Store/authStore.jsx";
import { useKeycloak } from "@react-keycloak/web";

const NotFound = () => {
  const { keycloak } = useKeycloak();
  const { setUser } = useContext(AuthStore);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    keycloak.logout();
  }

  // useEffect(() => {
  //   handleLogout();
  // }, []);
  return (
    <section className="bg-gray-100 h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-full">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-4/12 text-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-6xl text-gray-700">404</h1>

              <div className="mt-8">
                <h3 className="text-3xl font-semibold">Looks like you're lost</h3>
                <p className="text-gray-600">
                  The page you are looking for is not available!
                </p>

                <p
                  onClick={() => navigate("/")}
                  className="mt-4 inline-block bg-[rgb(0,78,150)] text-white px-6 py-3 rounded hover:bg-[rgb(0,78,130)]"
                >
                  Go to Login
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
