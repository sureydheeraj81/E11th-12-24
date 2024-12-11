import React, { useState } from "react";
import AdminHeader from "./layout/AdminHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/Apis";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const createdAt = queryParams.get("createdAt");

  const [inputs, setInputs] = useState({
    token: token,
    createdAt: createdAt,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (inputs.password !== inputs.confirmPassword) {
        toast.error("Password doesn't match");
      } else {
        let response = await resetPassword(inputs);
        if (response.success) {
          toast.success(response.data.message);
          navigate("/admin/login");
        } else {
          toast.error(response.message.message);
        }
      }
    } catch (error) {
      toast.error("Error in password updation !");
    }
  };

  const handleCancel = () => {
    navigate("/admin/login");
  }

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
            <h3>Change Password</h3>
          </section>
          <div className="input-group">
            <span className="input-group-text">
            <i className="fa-solid fa-key"></i>
            </span>
            <input
              type="password"
              name="password"
              className="form-control"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Create new password"
              required
              minLength={8}
            />
          </div>
          <div className="input-group">
            <span className="input-group-text">
            <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={inputs.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="mt-10 text-center">
            <button type="submit" className="btn btn-success col-md-5 me-2">
              Submit
            </button>
            <button className="btn btn-danger col-md-5" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
