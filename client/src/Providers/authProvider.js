import { useState, useEffect } from "react";
import AuthContext from "../Context/authContext.js";

const AuthProvider = ({ children }) => {
  const [userContext, setUserContext] = useState({
    userType: "",
    userData: null,
  });

  useEffect(() => {}, [userContext]);
  const loginUserContext = (userType, userData) => {
    setUserContext({
      userType,
      userData,
    });
  };
  const logoutUserContext = () => {
    setUserContext({
      userType: "",
      userData: null,
    });
  };
  return (
    <AuthContext.Provider
      value={{ userContext, loginUserContext, logoutUserContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
