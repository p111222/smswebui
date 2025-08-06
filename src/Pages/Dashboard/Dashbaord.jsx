import React, { useEffect, useState } from "react";
import PendingTasks from "./components/PendingTasks.jsx";
import SearchSetup from "./components/SearchSetup.jsx";

const Dashboard = () => {
  const [pendingGridApi, setPendingGridApi] = useState(null);
  const [searchGridApi, setSearchGridApi] = useState(null);

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <div
      onClick={() => {
        if (pendingGridApi || searchGridApi) {
          pendingGridApi.deselectAll();
          searchGridApi.deselectAll();
        }
      }}
    >
      <div>
        <PendingTasks
          pendingGridApi={pendingGridApi}
          setPendingGridApi={setPendingGridApi}
        />
      </div>
      <div className="mt-5">
        <SearchSetup
          searchGridApi={searchGridApi}
          setSearchGridApi={setSearchGridApi}
        />
      </div>
    </div>
  );
};

export default Dashboard;
