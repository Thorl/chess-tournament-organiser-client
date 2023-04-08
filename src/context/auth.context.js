import axios from "axios";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants/API_URL";

export const AuthContext = React.createContext();

export const AuthProviderWrapper = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const storeAuthToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = async () => {
    const storedAuthToken = localStorage.getItem("authToken");

    if (storedAuthToken) {
      try {
        await axios.get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedAuthToken}` },
        });

        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  const removeAuthToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeAuthToken();

    authenticateUser();

    navigate("/");
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        storeAuthToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
