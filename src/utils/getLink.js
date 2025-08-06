import { getPage } from "../Pages/Login/services/loginService";

const getLink = (userType, page) => {
  if (!userType || !page) {
    return;
  }
  switch (userType) {
    case "useradmin":
      return `/smsweb/useradmin/${getPage(page)}`;
    case "backOfficeUser":
      return `/smsweb/backofficeuser/${getPage(page)}`;
    case "itSupport":
      return `/smsweb/itsupport/${getPage(page)}`;
    case "branchuser":
      return `/smsweb/branchuser/${getPage(page)}`;
    case "corporateUsers":
      return `/smsweb/corporateusers/${getPage(page)}`;
    case "corporateUserAdmin":
      return `/smsweb/corporateadmin/${getPage(page)}`;
    case "grievanceRedressal":
      return `/smsweb/grievanceredressal/${getPage(page)}`;
    default:
      navigate("/");
  }
};

export default getLink;
