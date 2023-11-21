import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

export const App = () => {
  let user = false;
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/signup" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};
