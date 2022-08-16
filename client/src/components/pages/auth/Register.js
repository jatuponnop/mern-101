import React, { useState } from "react";
import { toast } from "react-toastify";

// Functions
import { registerHandler } from "../../functions/auth";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password2: ""
  })
  const [loading, setLoading] = useState(false);

  const { name, password, password2 } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    if (password != password2) {
      toast.error("Password not Match");
      setLoading(false);
    } else {
      const newUser = {
        name, password
      }
      registerHandler(newUser)
        .then(res => {
          toast.success("Register Complete");
          setLoading(false);
        }).catch(err => {
          toast.error(err.response.data.msg);
          setLoading(false);
        })
    }
  }

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading
            ? (<h1>Register</h1>)
            : (<h1>Loading...</h1>)}
          <form onSubmit={onSubmit}>
            <input
              type="text"
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
            <input
              type="password"
              className="form-control"
              name="password2"
              autoFocus
              placeholder="Re-Password"
              onChange={onChange}
            />
            <button type="submit"
              disabled={password.length < 6}
              className="btn btn-success"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;