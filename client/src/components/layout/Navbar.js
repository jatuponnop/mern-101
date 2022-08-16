import { AppstoreOutlined, UserAddOutlined, DownOutlined, LogoutOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"


function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const [current, setCurrent] = useState("home");
  let logged = true;

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    })
    navigate("/")
  }
  const onClick = (e) => {
    setCurrent(e.key);
  }

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>Home</Menu.Item>
      <Menu.Item key="person" icon={<AppstoreOutlined />}>Person</Menu.Item>
      {!user &&
        (
          <Menu.Item key="register" icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        )
      }
      {!user && (
        <Menu.Item key="login" icon={<LoginOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      )
      }
      {
        user && (
          <Menu.SubMenu key="logoutt" icon={<DownOutlined />} title={user.name}>
            <Menu.Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
          </Menu.SubMenu>
        )
      }
    </Menu>
  )
}

export default Navbar