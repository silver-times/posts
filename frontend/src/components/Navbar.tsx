import { Link } from "react-router-dom";
import { useSignout } from "../hooks/useSignout";
import { useAuthContext } from "../hooks/useAuthContext";

export const Navbar = () => {
  const { signoutHandler } = useSignout();
  const { user } = useAuthContext();

  const handleClick = () => {
    signoutHandler();
  };

  return (
    <nav className="p-5 bg-[#BFDB38] text-black ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-6xl font-extralight text-black hover:text-gray-200">
            POSTS
          </h1>
        </Link>
        <div className="flex gap-5">
          {user ? (
            <>
              <p className="text-xl font-bold">Hi, {user.firstName} 👋🏻</p>
              <button onClick={handleClick} className="text-xl font-bold">
                Signout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <p className="text-xl font-bold hover:text-gray-200">Login</p>
              </Link>
              <Link to="/signup">
                <p className="text-xl font-bold hover:text-gray-200">Signup</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
