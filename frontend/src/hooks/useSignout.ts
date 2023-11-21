import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
  const { setUser } = useAuthContext();

  const signoutHandler = async () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { signoutHandler };
};
