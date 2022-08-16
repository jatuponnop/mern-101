import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import LoadingToRedirect from "./LoadingToRedirect"

import { currentAdmin } from '../functions/auth';

const AdminAuth = ({ children }) => {
  const user = useSelector(state => state.user);
  return user && user.token && user.role == "admin"
    ? children : <LoadingToRedirect />
}

export default AdminAuth
