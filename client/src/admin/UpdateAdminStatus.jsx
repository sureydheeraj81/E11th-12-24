import React, { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { updateAdminStatus } from "../services/Apis";

const UpdateAdminStatus = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [inputs, setInputs] = useState({
    status: "",
    usertype: "",
    modified_by: "",
    designation: "",
    username: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    console.log(inputs);
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    setName("");
    toast.error("Changes discarded");
    navigate("/admin/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await updateAdminStatus(inputs);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/dashboard");
      } else {
        toast.error(response.data.message);
      }
      setName("");
    } catch (error) {
      toast.error("Error in user category page!");
    }
  };
  console.log(inputs);

  useEffect(() => {
    if (location.state) {
      setInputs({
        status: location.state.status,
        usertype: location.state.usertype,
        modified_by: "superadmin",
        designation: location.state.designation,
        username: location.state.username,
      });
    }
  }, [location.state]);

  return (
    <Sidebar>
      <div className="clear">
        <div className="section_heading">
          <h2 className="title_heading">Admin Profile</h2>
        </div>
        <div className="mb-4">
          <div className="box_header">
            <div>
              <button
                className="btn btn-link"
                data-bs-toggle="collapse"
                data-bs-target="#subscriptionForm"
                aria-expanded="true"
                aria-controls="subscriptionForm"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <i className="fa-solid fa-calendar-plus"></i>&nbsp; Update admin
                profile
              </button>
            </div>
          </div>
          <div id="subscriptionForm" className="collapse show">
            <div className="box_body">
              <form action="" className="plan-form" onSubmit={handleSubmit}>
                <div className="row mt-2">
                  <label className="col-md-10">Admin username</label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      name="username"
                      className="col-md-6"
                      value={inputs.username}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      disabled
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <label className="col-md-10">Admin Designation</label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      name="designation"
                      className="col-md-6"
                      value={inputs.designation}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <label className="col-md-10">Admin usertype</label>
                  <div className="col-md-10">
                    <select
                      name="usertype"
                      value={inputs.usertype}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="admin">Admin</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-2">
                  <label className="col-md-10">Admin Status</label>
                  <div className="col-md-10">
                    <select
                      name="status"
                      value={inputs.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="Active">Active</option>
                      <option value="Blocked">Blocked</option>
                      <option value="Deleted">Deleted</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-2"></div>
                  <div className="col-md-4">
                    <button
                      className="btn btn-warning "
                      style={{ marginRight: "1rem" }}
                      onClick={handleDiscard}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-success" type="submit">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};
export default UpdateAdminStatus;
