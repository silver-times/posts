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
    <nav className="p-5 bg-primary text-black ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex hover:text-white">
          <span className="material-symbols-outlined text-6xl">
            contract_edit
          </span>
          <h1 className="text-6xl text-black hover:text-white ">
            ReactPosts...
          </h1>
        </Link>
        <div className="flex gap-5">
          {user ? (
            <>
              <p className="text-xl font-bold">
                Hi,{" "}
                {user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1)}{" "}
                👋🏻
              </p>
              <button
                onClick={handleClick}
                className="text-xl font-bold hover:text-white"
              >
                Signout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <p className="text-xl font-bold hover:text-white">Login</p>
              </Link>
              <Link to="/signup">
                <p className="text-xl font-bold hover:text-white">Signup</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
