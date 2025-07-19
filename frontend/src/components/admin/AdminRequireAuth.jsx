import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";

export const AdminRequireAuth = ({ children }) => {
  const { user } = useContext(AdminAuthContext);
  if (!user) {
    return <Navigate to={`/admin/login`}></Navigate>;
  }

  return children;
};
