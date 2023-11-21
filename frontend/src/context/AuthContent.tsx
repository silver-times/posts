import React, { createContext, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

interface ChildrenProps {
  children: React.ReactNode;
}

const AuthContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
