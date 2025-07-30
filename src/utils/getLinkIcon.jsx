import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LoopIcon from "@mui/icons-material/Loop";
import AssessmentIcon from "@mui/icons-material/Assessment";
import UploadIcon from "@mui/icons-material/Upload";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HelpIcon from "@mui/icons-material/Help";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";

// Get Link Icon Function
const getLinkIcon = (linkname) => {
  if (linkname === "SMS Request") {
    return <PersonAddAltIcon />;
  } else if (linkname === "VA Maintenance") {
    return <SettingsIcon />;
  } else if (linkname === "Reconciliation") {
    return <LoopIcon />;
  } else if (linkname === "Branch Module for Cash and Cheque") {
    return <AccountBalanceIcon />;
  } else if (linkname === "Task Board") {
    return <DashboardIcon />;
  } else if (linkname === "Corporate Dashboard") {
    return <DashboardIcon />;
  } else if (linkname === "IT Support") {
    return <ListAltIcon />;
  } else if (linkname === "Approval History") {
    return <HistoryIcon />;
  } else if (linkname === "Support") {
    return <HelpIcon />;
  } else if (linkname === "V Creation") {
    return <UploadIcon />;
  } else if (linkname === "Reports") {
    return <AssessmentIcon />;
  } else if (linkname === "Corporate VA Maintenance") {
    return <SettingsIcon />;
  } else if (linkname === "API Audit Log") {
    return <ListAltIcon />;
  } else if (linkname === "User Management") {
    return <AdminPanelSettingsIcon />;
  } else if (linkname === "User Creation") {
    return <AdminPanelSettingsIcon />;
  } else if (linkname === "Grievance Redressal") {
    return <InfoIcon />;
  } else {
    return null; 
  }
};

export default getLinkIcon;

