import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext("");

export const ContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/user/profile", {
          method: "GET",
          credentials: true,
        });
        if (res.ok) {
          const data = await res.json();
          setAuthUser(data.data);
        } else {
          setAuthUser(null);
        }
      } catch (error) {
        setAuthUser(null);
      }
    };
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
