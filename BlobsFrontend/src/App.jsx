import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { Route, Routes, useNavigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import { UserProvider } from "./contexts/UserContext";
import ProfilePage from "./pages/ProfilePage";
import { PostProvider } from "./contexts/PostContext";

function App() {
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  // const [loggedUser, setLoggedUser] = useState({});

  // const fetchLoggedUser = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:3000/api/auth/profile",
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     setLoggedUser(data);
  //   } catch (err) {
  //     console.log("User not logged in.");
  //     navigate("/login");
  //   }
  // };

  // useEffect(() => {
  //   fetchLoggedUser();
  // }, []);

  // console.log(posts);

  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />

        <Route
          path="/home"
          element={
            <PostProvider>
              <UserProvider>
                <HomePage />
              </UserProvider>
            </PostProvider>
          }
        />
        <Route
          path="/profile/:username"
          element={
            <PostProvider>
              <UserProvider>
                <ProfilePage />
              </UserProvider>
            </PostProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
