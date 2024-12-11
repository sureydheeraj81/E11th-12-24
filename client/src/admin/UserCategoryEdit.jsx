import React, { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUserCategories } from "../services/Apis";
import toast from "react-hot-toast";

const UserCategoryEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    sno: "",
  });

  const handleDiscard = (e) => {
    e.preventDefault();
    toast.error("Category changes discarded");
    navigate("/admin/user-categories");
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let response = await updateUserCategories(form.sno, form);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/user-categories");
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
        name: location.state.name,
        sno: location.state.sno
      })
    }
  }, [location.state]);

  return (
    <Sidebar>
      <div className="clear">
        <div className="section_heading">
          <h2 className="title_heading">User Categories</h2>
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
                Category &emsp;
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
                      name="name"
                      id=""
                      value={form.name}
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
                      Update Category
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
export default UserCategoryEdit;
