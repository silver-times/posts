import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import AuthContextProvider from "./context/AuthContent.tsx";
import PostContextProvider from "./context/PostContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
