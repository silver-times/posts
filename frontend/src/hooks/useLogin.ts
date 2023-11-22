import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error);
      setError(data.error);
      setIsLoading(false);
      return;
    } else {
      toast.success("Logged in successfully!");
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    setIsLoading(false);
  };

  return { login, error, isLoading };
};
