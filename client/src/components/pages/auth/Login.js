import React, { useState } from "react";
import { toast } from "react-toastify";

// Functions
import { loginHandler } from "../../functions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { name, password } = formData;

  const roleBasedRedirect = (role) => {
    if (role == "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard", { replace: true });
    }
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    const newUser = {
      name,
      password,
    };
    loginHandler(newUser)
      .then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            token: res.data.token,
            name: res.data.payload.user.name,
            role: res.data.payload.user.role,
          },
        });
        localStorage.setItem("token", res.data.token);
        console.log(res.data.payload.user.name);
        toast.success("Login Complete");
        setLoading(false);
        roleBasedRedirect(res.data.payload.user.role);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        setLoading(false);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md6 offset-md-3">
          {!loading ? <h1>Login</h1> : <h1>Loading...</h1>}
          <form onSubmit={onSubmit}>
            <input
              type="true"
              className="form-control"
              name="name"
              autoFocus
              placeholder="Username"
              onChange={onChange}
            />
            <input
              type="password"
              className="form-control"
              name="password"
              autoFocus
              placeholder="Password"
              onChange={onChange}
            />
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
