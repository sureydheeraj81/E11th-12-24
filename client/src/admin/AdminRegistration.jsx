import React, { useState } from "react";
import AdminHeader from "./layout/AdminHeader";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { adminRegister } from "../services/Apis";

const AdminRegistration = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [fileName, setFileName] = useState("");
  const [inputs, setInputs] = useState({
    full_name: "",
    email: "",
    mobile: "",
    gender: "",
    usertype: "",
    username: "",
    password: "",
    designation: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type, files } = e.target;

    if (type === "file") {
      let file = files[0];
      if (file.size / 1024 < 100) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          [name]: file, // Store the file object
        }));
        setFileName(file.name);
      } else {
        toast.error(
          "File is too large. Please upload a file smaller than 100kb !"
        );
      }
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.mobile.length !== 10) {
      toast.error("Contact number length should be exactly 10 number");
    } else if (
      inputs.full_name === "" ||
      inputs.email === "" ||
      inputs.mobile === "" ||
      inputs.gender === "" ||
      inputs.usertype === "" ||
      inputs.username === "" ||
      inputs.password === "" ||
      inputs.designation === "" ||
      inputs.profilePic === null ||
      inputs.profilePic === undefined
    ) {
      toast.error("All fields are mandatory !");
    } else {
      try {
        let response = await adminRegister(inputs, {
          "Content-Type": "multipart/form-data",
        });
        if (response.data.success) {
          toast.success(response.data.message + "please wait for approval !");
          navigate("/admin/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error in admin registration page !");
      }
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="container mt-4">
      <div className="row justify-content-center mx-1">
        <div className="col-lg-5 col-md-8 col-sm-10 p-4 rounded shadow">
          <section className="text-center">
            <i className="fa-solid fa-user-tie fa-2x text-primary"></i>
            <h3>Admin Registration</h3>
          </section>
          <form
            className="row g-3 mt-3"
            onSubmit={handleSubmit}

          >
            <div className="input-group">
              <span className="input-group-text">
              <i className="fa-solid fa-signature"></i>
              </span>
              <input
                type="text"
                name="full_name"
                className="form-control shadow-none"
                value={inputs.full_name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="input-group">
              <span className="input-group-text">
              <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                className="form-control shadow-none"
                value={inputs.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-group">
              <span className="input-group-text">
              <i className="fa-solid fa-mobile-screen-button"></i>
              </span>
              <input
                type="text"
                name="mobile"
                className="form-control shadow-none"
                value={inputs.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                required
              />
            </div>
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
              <i className="fa-solid fa-unlock-keyhole"></i>
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
            <div className="input-group">
              <span className="input-group-text">
              <i className="fa-solid fa-address-card"></i>
              </span>
              <input
                type="text"
                name="designation"
                className="form-control shadow-none"
                value={inputs.designation}
                onChange={handleChange}
                placeholder="Enter your designation"
                required
              />
            </div>
            <div className="input-group">
              <span className="input-group-text">
              <i className="fa-solid fa-venus-mars"></i>
              </span>
              <select
                name="gender"
                className="form-select shadow-none"
                value={inputs.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <span className="input-group-text">
              <i className="fa-solid fa-users"></i>
              </span>
              <select
                name="usertype"
                className="form-select shadow-none"
                value={inputs.usertype}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div>
              {fileName === "" ? (
                <div className="input-group">
                  <label
                    htmlFor="profilePic"
                    className="input-group-text rounded"
                  >
                   <i className="fa-solid fa-image me-2"></i>
                   <span className="">Upload Profile Image</span>
                  </label>
                  
                  <input
                    type="file"
                    name="profilePic"
                    onChange={handleChange}
                    hidden
                    className="form-control-file"
                    id="profilePic"
                    accept=".jpg,.jpeg,.png"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="profilePic" className="border px-2 py-1 rounded alert alert-success">Uploaded</label>
                  <input
                    type="file"
                    name="profilePic"
                    onChange={handleChange}
                    hidden
                    className="form-control-file"
                    id="profilePic"
                    accept=".jpg,.jpeg,.png"
                    required
                  />
                </div>
              )}
            </div>
          </form>
          <section className="d-flex flex-column w-100 mt-3">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Submit
            </button>
            <Link
              to="/admin/login"
              className="text-center text-decoration-none mt-2"
            >
              Click here to login
            </Link>
          </section>
        </div>
      </div>
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

export default AdminRegistration;
