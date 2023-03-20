import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

export const AnonRoutes = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  } else {
    return <Outlet />;
  }
};
