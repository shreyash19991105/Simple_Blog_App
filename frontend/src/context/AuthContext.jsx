import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [config, setConfig] = useState({
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token})}`,
    },
  });

  //checking at initial load
  useEffect(() => {
    const controlAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/authCheck",
          config
        );
        console.log("response", response);
        console.log("initial load");
        setActiveUser(response.data.user);
        console.log("activuser", activeUser);
      } catch (error) {
        console.log("error in authcontext");
        console.log(error);
        setActiveUser({});
      }
    };
    controlAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ activeUser, setActiveUser, config, setConfig }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
