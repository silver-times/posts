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

  const refreshAccessToken = async () => {
    try {
      const refreshToken = user?.refreshToken;
      const response = await fetch("http://localhost:5000/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      const newAccessToken = data.accessToken;

      setUser((prevUser) => {
        if (prevUser) {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...prevUser, accessToken: newAccessToken })
          );
          return { ...prevUser, accessToken: newAccessToken };
        }
        return prevUser;
      });
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  };

  useEffect(() => {
    const accessToken = user?.accessToken;

    if (accessToken) {
      const accessTokenPayload = JSON.parse(
        atob(accessToken.split(".")[1] || "")
      );

      const expirationTimeInSeconds = accessTokenPayload.exp;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);

      if (expirationTimeInSeconds < currentTimeInSeconds) {
        refreshAccessToken();
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
