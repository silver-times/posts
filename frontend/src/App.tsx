import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { PostDetail } from "./pages/PostDetail";
import { UserPosts } from "./pages/UserPosts";
import { useAuthContext } from "./hooks/useAuthContext";

export const App = () => {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Navbar />
      <div className="">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route path="/posts/:postId" element={user && <PostDetail />} />
          <Route path="/posts/user/:userId" element={user && <UserPosts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
