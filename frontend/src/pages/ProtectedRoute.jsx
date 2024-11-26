import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const bool = localStorage.getItem("token") ? true : false;
  const [auth, setAuth] = useState(bool);
  const { setActiveUser, setConfig } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const controlAuth = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      try {
        const response = await axios.get(
          "http://localhost:5000/api/authCheck",
          config
        );
        console.log(response);
        setAuth(true);
        setActiveUser(response.data.user);
        setConfig(config);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };

    controlAuth();
  }, [bool, navigate]);
  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
