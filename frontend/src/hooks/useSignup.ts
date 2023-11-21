import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, firstName, lastName, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setIsLoading(false);
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    setIsLoading(false);
  };

  return { signup, error, isLoading };
};
