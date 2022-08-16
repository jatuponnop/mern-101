import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/create-person">Create</Link>
        </li>
      </ul>
    </nav>
  )
}

export default AdminNav;