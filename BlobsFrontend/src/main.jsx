import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

import { UserProvider } from "./contexts/UserContext";
import { PostProvider } from "./contexts/PostContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <StrictMode> */}
    <UserProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </UserProvider>
    {/* </StrictMode> */}
  </BrowserRouter>
);
