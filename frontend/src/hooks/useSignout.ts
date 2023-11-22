import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
  const { setUser } = useAuthContext();

  const signoutHandler = async () => {
    toast.success("Signed out successfully!");
    localStorage.removeItem("user");
    setUser(null);
  };

  return { signoutHandler };
};
