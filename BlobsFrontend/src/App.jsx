import "./index.css";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import PostDetailsPage from "./pages/PostDetailsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/joinUs" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/postDetails" element={<PostDetailsPage />} />

        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          removeDelay: 1000,
          className: `
          text-white 
          bg-[#8a6bf1] 
          rounded-xl 
          px-4 
          py-3 
          text-sm 
          md:text-base 
          lg:text-lg 
          shadow-lg 
          font-semibold
        `,
          style: {
            background: "#8a6bf1",
            color: "#ffffff",
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: "#ffffff",   
              secondary: "#8a6bf1", 
            },
          },
          
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#ffffff",
              secondary: "#f87171", 
            },
          },
        }}
      />
    </>
  );
}

export default App;
