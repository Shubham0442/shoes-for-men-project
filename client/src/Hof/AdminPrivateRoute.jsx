import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const isAdmin = useSelector(
    (state) => state.userAuthReducer?.userData?.cosign
  );
  console.log(isAdmin);

  if (isAdmin !== "Admin") return <Navigate to={"/accessdenied"} />;
  else return children;
};

export default AdminPrivateRoute;
