import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../../layout/AdminNav";
import { createPerson, getPersons, removePerson } from "../../functions/person";
import { toast } from 'react-toastify';
import { Avatar, Progress, Table } from "antd";


import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import moment from "moment";
import { Link } from "react-router-dom";

const AdminCreatePerson = () => {
  const user = useSelector(state => state.user);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [persons, setPersons] = useState([]);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");

  const [uploadPercentage, setUploadPercentage] = useState(0);

  const loadPersons = (authtoken) => {
    getPersons(authtoken)
      .then((res) => {
        setPersons(res.data)
      })
      .catch(err => {
        console.log("Error", err);
        toast.error(err)
      })
  }

  useEffect(() => {
    loadPersons(user.token);
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(file);
    if (loading) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file)
    formData.append("data", name);
    setLoading(true);
    createPerson(formData, user.token, setUploadPercentage)
      .then(res => {
        setLoading(false);
        setName("");
        setFilename("Choose files....");
        setUploadPercentage(0);
        toast.success("Create " + res.data.name + " Success!");
        loadPersons(user.token);
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.response);
      });
  }
  const handleRemove = (id) => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (window.confirm("Are you sure Delete!")) {
      setLoading(true);
      removePerson(id, user.token)
        .then(res => {
          console.log("res =", res);
          setLoading(false);
          toast.success("Remove Success!");
          loadPersons(user.token)
        }).catch(err => {
          setLoading(false)
          console.log("err = ", err)
        })
    }
  }
  const columns = [
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "วันที่",
      render: (record) => (
        <>
          {moment(record.date).locale("th").format("MMMM Do YYYY, h:mm:ss: a")}
        </>
      )
    },
    {
      title: "ไฟล์",
      render: (record) => (
        <Avatar src={`http://localhost:8000/uploads/${record.pic}`} />
      )
    },
    {
      title: "Actions",
      render: (record) => (
        <span className="btn btn-sm float-right">
          <DeleteOutlined onClick={() => {
            handleRemove(record._id);
          }} className="text-danger" />
          <Link to={"/admin/update-person/" + record._id}>
            <span className="btn btn-sm float-right">
              <EditOutlined className="text-warning" />
            </span>
          </Link>
        </span>
      )
    }
  ]


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
                onChange={(e) => { setName(e.target.value) }}
              />
            </div>
            <div className="custom-file mb-4">
              <input
                type="file"
                className="custom-file-input"
                onChange={(e) => {
                  setFile(e.target.files[0])
                  setFilename(e.target.files[0].name)
                }}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {filename}
              </label>
              <Progress
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068"
                }}
                percent={uploadPercentage}
              />
            </div>
            <button className="btn btn-outline-primary">Save</button>
          </form>
          <hr />
          <Table columns={columns} dataSource={persons} />
        </div>
      </div>
    </div>
  )
}

export default AdminCreatePerson;

