import React, { createContext, useState, useEffect } from "react";
import type { User, AuthContextType, ChildrenProps } from "../types/index";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

const AuthContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userJSON = localStorage.getItem("user");

    if (userJSON) {
      setUser(JSON.parse(userJSON!));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
