import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../../layout/AdminNav";
import { updatePerson, getPerson } from '../../functions/person';
import { toast } from "react-toastify";

import { Progress } from "antd";
import { useParams } from "react-router-dom";

const AdminUpdatePerson = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");

  const loadPerson = (id, authtoken) => {
    getPerson(id, authtoken)
      .then((res) => {
        console.log("res", res);
        setName(res.data.name);
        setFilename(res.data.pic)
        console.log(res)
      })
      .catch(err => {
        console.log("Error", err);
        toast.error(err)
      })
  }

  useEffect(() => {
    loadPerson(id, user.token);
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", filename);
    formData.append("data", name);
    if (loading) {
      return;
    }
    setLoading(true);
    updatePerson(id, formData, user.token, setUploadPercentage)
      .then(res => {
        console.log("res");
        setLoading(false);
        setUploadPercentage(0);
        toast.success("Update " + res.data.name + " Success!")
      })
      .catch(err => {
        setLoading(false);
        console.log("Error", err);
        toast.error(err)
      })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4>Loading...</h4> : <h1>Admin Create Person</h1>}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>ชื่อ</label>
              <input
                type="text"
                className="form-control"
                autoFocus
                required
                value={name}
                onChange={(e) => { setName(e.target.value) }}
              />
            </div>
            <div className="custom-file mb-4">
              <input
                type="file"
                className="custom-file-input"
                onChange={(e) => {
                  setFile(e.target.files[0])
                }}
              />
              <label className="custom-file-label" htmlFor="customFile">{filename}</label>
              <Progress
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87b068"
                }}
                percent={uploadPercentage}
              />
            </div>
            <button className="btn btn-outline-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminUpdatePerson;