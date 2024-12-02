import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userDocData, setUserDocData] = useState(() => {
    const savedUserDocData = sessionStorage.getItem("userDocData");
    return savedUserDocData ? JSON.parse(savedUserDocData) : null;
  });

  useEffect(() => {
    if (userDocData) {
      sessionStorage.setItem("userDocData", JSON.stringify(userDocData));
    } else {
      sessionStorage.removeItem("userDocData");
    }
  }, [userDocData]);

  const value = useMemo(() => ({ userDocData, setUserDocData }), [userDocData]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
