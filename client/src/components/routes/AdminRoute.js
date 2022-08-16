import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

import { currentAdmin } from "../functions/auth";

const AdminRoute = ({ children, ...rest }) => {
  const user = useSelector(state => state.user);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT Admin", res);
          setOk(res);
        })
        .catch(err => {
          console.log("Admin router err", err);
          setOk(false);
        })
    }
  }, [user]);
  return (ok ? <Route {...rest} /> : <LoadingToRedirect />)
}

export default AdminRoute;