import React, { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  updateRegRejectionReason,
} from "../services/Apis";
import toast from "react-hot-toast";

const RegRejectionReasonEdit = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    description: "",
    sno: "",
  });

  const handleDiscard = (e) => {
    e.preventDefault();
    setForm("");
    toast.error("Changes discarded");
    navigate("/admin/reg-rejection");
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let response = await updateRegRejectionReason(form.sno, form);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/reg-rejection");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error in user category page!");
    }
  };

  useEffect(() => {
   if(location.state){
    setForm({
      sno: location.state.sno,
      description: location.state.description
    })
   }
  }, [location.state]);

  return (
    <Sidebar>
      <div className="clear">
        <div className="section_heading">
          <h2 className="title_heading">Registration Rejection Reasons</h2>
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
                <i className="fa-solid fa-calendar-plus"></i>&emsp; Update
                Registration Reason &emsp;{" "}
                <i className="fa-solid fa-caret-down cus-toggle"></i>
              </button>
            </div>
          </div>
          <div id="subscriptionForm" className="collapse show">
            <div className="box_body">
              <form action="" className="plan-form" onSubmit={handleUpdate}>
                <div className="row mt-2">
                  <label className="col-md-2">
                    Description <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <textarea
                      name="description"
                      id=""
                      value={form.description}
                      className="col-md-6"
                      onChange={handleChange}
                      required
                    ></textarea>
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
                      Update Rejection Reason
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

export default RegRejectionReasonEdit;
