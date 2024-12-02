import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import PropTypes from "prop-types";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { userDocData } = useAuth();
  console.log(userDocData);

  return userDocData ? <Component {...rest} /> : <Navigate to="/login" />;
};

// Validación de props
PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
