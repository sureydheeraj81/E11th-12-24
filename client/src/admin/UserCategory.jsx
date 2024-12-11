import React, { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  addNewUserCategory,
  deleteUserCategory,
  getUserCategoryData,
} from "../services/Apis";
import toast from "react-hot-toast";

const UserCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  const handleDiscard = (e) => {
    e.preventDefault();
    setName("");
    toast.error("Category changes discarded");
    navigate("/admin/user-categories");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await addNewUserCategory({ name: name });

      if (response.data.success) {
        toast.success(response.data.message);
        getUserCategory();
      } else {
        toast.error(response.data.message);
      }
      setName("");
    } catch (error) {
      toast.error("Error in user category page!");
    }
  };

  const getUserCategory = async () => {
    try {
      let response = await getUserCategoryData();
      setData(response.data.data);
    } catch (error) {
      toast.error("Error in user category page!");
    }
  };

  const handleEdit = (idx) => {
    if (idx >= 0) {
      navigate(`/admin/user-categories/edit/${idx}`, {state:data[idx]});
    } else {
      toast.error("Error in category editing");
    }
  };

  const handleDelete = async (idx) => {
    let sno = data[idx].sno;
    try {
      let response = await deleteUserCategory({ sno: sno });

      if (response.data.success) {
        toast.success(response.data.message);
        getUserCategory();
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Error in category page");
    }
  };

  useEffect(() => {
    getUserCategory();
  }, []);

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
                aria-expanded="false"
                aria-controls="subscriptionForm"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <i className="fa-solid fa-calendar-plus"></i>&emsp; Add New
                Category &emsp;
                <i className="fa-solid fa-caret-down cus-toggle"></i>
              </button>
            </div>
          </div>
          <div id="subscriptionForm" className="collapse">
            <div className="box_body">
              <form action="" className="plan-form" onSubmit={handleSubmit}>
                <div className="row mt-2">
                  <label className="col-md-2">
                    Description <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <textarea
                      name="data"
                      id=""
                      value={name}
                      className="col-md-6"
                      onChange={(e) => setName(e.target.value)}
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
                      Add Category
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="box_header">
              <div style={{ padding: "5px 0px" }}>
                <i className="fa-regular fa-rectangle-list"></i>&emsp; List of
                User Categories
              </div>
            </div>
            <div>
              <div className="box_body">
                <div>
                  <table className=" data_table">
                    <thead className="table-primary">
                      <tr>
                        <th>SNo</th>
                        <th className="desc">Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody style={{fontSize:'15px'}}>
                      {data.length > 0 ? (
                        data.map((elem, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td className="desc">{elem.name}</td>
                              <td>
                                <button
                                  className="btn"
                                  onClick={() => handleEdit(idx)}
                                >
                                  <i className="fa-regular fa-pen-to-square text-dark fa-2x"></i>
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn"
                                  onClick={() => handleDelete(idx)}
                                >
                                  <i className="fa-solid fa-trash-can text-danger fa-2x"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default UserCategory;
