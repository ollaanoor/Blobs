import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLoggedUser = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/auth/profile`,
        {
          withCredentials: true,
        }
      );
      setLoggedUser(data);
    } catch (error) {
      setLoggedUser(null);
      console.log("User not logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoggedUser();
  }, []);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
