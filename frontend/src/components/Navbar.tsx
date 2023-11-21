import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="p-5 bg-[#BFDB38]">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-6xl font-extralight">POSTS</h1>
        </Link>
        <div className="flex gap-5">
          <Link to="/login">
            <p className="text-xl font-bold">Login</p>
          </Link>
          <Link to="/signup">
            <p className="text-xl font-bold">Signup</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};
