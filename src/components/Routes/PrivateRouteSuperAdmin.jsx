import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { ROLE } from "../../utils/constants";

export const PrivateRouteSuperAdmin = ({component: Component,  redirectTo = "/",}) => {
  const { isLoggedIn, isRefreshing, user } = useAuth();
  const role = user.role === ROLE.superAdmin;
  const shouldRedirect = (!isLoggedIn && !isRefreshing) || !role;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

PrivateRouteSuperAdmin.propTypes = {
   component: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
