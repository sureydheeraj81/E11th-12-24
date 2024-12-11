import React, { useState } from "react";
import AdminHeader from "./layout/AdminHeader";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { adminLogin } from "../services/Apis";

const AdminLogin = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await adminLogin(inputs);
      if (response.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/admin/dashboard");
      } else {
        toast.error(response.message.message);
      }
    } catch (error) {
      toast.error("Error in admin login page !");
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="d-flex flex-column align-items-center justify-content-center mt-5">
        <form
          className="d-flex flex-column justify-content-center p-4 gap-3 rounded shadow"
          onSubmit={handleSubmit}
        >
          <section className="text-center">
            <i className="fa-solid fa-user-tie fa-2x text-primary"></i>
            <h3>Admin Login</h3>
          </section>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-user"></i>
            </span>
            <input
              type="text"
              name="username"
              className="form-control shadow-none"
              value={inputs.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-key"></i>
            </span>
            <input
              type="password"
              name="password"
              className="form-control shadow-none"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-1">
            Submit
          </button>
          <section className="d-flex justify-content-between mt-n2 px-1">
            <Link to="/admin/register" className="text-decoration-none">
              Register here
            </Link>
            <Link to="/admin/forgot-password" className="text-decoration-none">
              Forgot Password
            </Link>
          </section>
        </form>
      </div>
      <div
        className="d-flex justify-content-center align-items-center text-white p-1 small position-absolute w-100 bottom-0"
        style={{
          backgroundColor: "#002147",
        }}
      >
        &copy; {currentYear} CORS | Survey of India | All rights reserved.
      </div>
    </div>
  );
};

export default AdminLogin;
