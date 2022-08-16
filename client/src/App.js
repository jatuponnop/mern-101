import React, { useEffect } from "react";

// CSS
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Component
import Navbar from "./components/layout/Navbar";

// Notify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Router
import { Routes, Route } from "react-router-dom";

// Pages
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Home from "./components/pages/Home";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import UserDashboard from "./components/pages/user/UserDashboard";

// Redux
import { useDispatch } from "react-redux";

// Functions
import { currentUser } from "./components/functions/auth";
import AdminCreatePerson from "./components/pages/admin/AdminCreatePerson";
import AdminUpdatePerson from "./components/pages/admin/AdminUpdatePerson";
import UserAuth from "./components/routes/UserAuth";
import AdminAuth from "./components/routes/AdminAuth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const idTokenResult = localStorage.token;
    if (idTokenResult) {
      currentUser(idTokenResult)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              token: idTokenResult,
              role: res.data.role,
              id: res.data._id,
            },
          });
        })
        .catch((err) => {
          console.log("Err", err);
        });
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user/dashboard' element={<UserAuth> <UserDashboard /></UserAuth>} />
        <Route path='/admin/create-person' element={<AdminAuth><AdminCreatePerson /></AdminAuth>} />
        <Route path='/admin/dashboard' element={<AdminAuth><AdminDashboard /></AdminAuth>} />
        <Route path='/admin/update-person/:id' element={<AdminAuth><AdminUpdatePerson /></AdminAuth>} />
      </Routes>
    </div>
  );
}

export default App;
