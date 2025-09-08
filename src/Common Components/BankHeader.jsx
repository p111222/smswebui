import React, { useContext, useState } from "react";
import SibLogo from "../assets/sibLogo.png";
import { useKeycloak } from "@react-keycloak/web";
import { AuthStore } from "../Store/authStore.jsx";
import { AppStore } from "../Store/appStore.jsx";
import Loader from "./Loader";
import Toastify from "./Toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import UserDetailsModal from "./UserDetailsModal.jsx";

const BankHeader = () => {
  const { user, setUser } = useContext(AuthStore);
  const { setLoading } = useContext(AppStore);
  const { keycloak } = useKeycloak();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    keycloak.logout();
    setUser(null);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center py-2 px-4 bg-white border-b border-gray-100">
        <div>
          <img
            src={SibLogo}
            alt="SIB Logo"
            className="w-36"
          />
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            {/* User Details with Hover Effect */}
            <div
              onClick={() => setModalOpen(true)}
              className="border border-[rgb(100,15,10)] rounded-md px-3 py-2 bg-white shadow-xs cursor-pointer hover:bg-[rgb(100,15,10)] hover:text-white transition-all duration-200 group"
            >
              <div className="flex flex-col gap-0.5">
                <div className="text-sm font-semibold text-[rgb(100,15,10)] truncate max-w-[120px] group-hover:text-white">
                  {user.userName || "User"}
                </div>
                <div className="text-[12px] text-gray-600 leading-tight group-hover:text-white">
                  {user.lastLogin && `Login: ${user.lastLogin}`}
                  {user.userType && ` • ${user.userType}`}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="border cursor-pointer border-[rgb(100,15,10)] text-[rgb(100,15,10)] rounded-md px-3 py-1.5 flex items-center gap-1 hover:bg-[rgb(100,15,10)] hover:text-white transition-all duration-200"
            >
              <LogoutIcon className="!text-xs" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        ) : null}
      </div>

      {/* User Details Modal */}
      {user && (
        <UserDetailsModal
          user={user}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}

      <Loader />
      <Toastify />
    </div>
  );
};

export default BankHeader;