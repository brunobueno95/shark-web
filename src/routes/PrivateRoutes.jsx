/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function PrivateRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  // const test = false;
  console.log("isAuthenticated:", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/adminLog" />;
  //return test ? <Outlet /> : <Navigate to="/adminLog" />;
}

export default PrivateRoutes;
