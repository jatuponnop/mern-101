import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

function UserAuth({ children }) {
  const user = useSelector(state => state.user);
  return user && user.token ? children : <LoadingToRedirect />
}

export default UserAuth;