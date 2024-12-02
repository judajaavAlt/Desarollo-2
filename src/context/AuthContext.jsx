import { createContext, useState, useContext, useEffect } from "react";

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

  return (
    <AuthContext.Provider value={{ userDocData, setUserDocData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
