import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks";

export const PrivateRoute = ({component: Component,  redirectTo = "/",}) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

PrivateRoute.propTypes = {
   component: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
