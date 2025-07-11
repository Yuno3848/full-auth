import { createContext, useContext, useState } from "react";

export const AuthContext = createContext("");

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const ContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user-info") || null)
  );
  return (
    <CounterContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </CounterContext.Provider>
  );
};
