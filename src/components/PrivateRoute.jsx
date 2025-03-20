import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Authcontext } from "../context/contextAPI";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useContext(Authcontext);
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? element : <Navigate to="/" />;
};

export default PrivateRoute;
