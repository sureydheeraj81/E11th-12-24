import { useNavigate, NavLink } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import "./styles/services-cors.css";
import { useState, useRef, useEffect } from "react";
import {
  createSubsData,
  deleteSubsData,
  getAllSubsData,
} from "../services/Apis";
import toast from "react-hot-toast";
import Pagination from "./components/Pagination";

const CorsPlans = () => {
  const [formData, setFormData] = useState({
    cors_plan: "",
    cors_description: "",
    subscription_charges: "",
    GST_amt: "",
  });
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(10);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSubsData(formData);
      if (response.data.success) {
        toast.success(response.data.message);
        getSubsData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("There was a problem in adding the service!");
    }
    formRef.current.reset();
  };

  const discardChanges = (e) => {
    e.preventDefault();
    toast.error("Adding data discarded");
    navigate("/admin/services");
    formRef.current.reset();
  };

  const getSubsData = async () => {
    try {
      const response = await getAllSubsData();
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      toast.error("There was a problem in adding the service!");
    }
  };

  const handleEdit = (idx) => {
    navigate(`/admin/services/edit/${idx}`, {state:data[idx]});
  };

  const handleDelete = async (idx) => {
    let sno = data[idx].sno;
    try {
      let response = await deleteSubsData({ sno: sno });
      if (response.data.success) {
        toast.success(response.data.message);
        getSubsData();
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getSubsData();
  }, []);

  const indexOfLastRecord = currentPage * count;
  const indexOfFirstRecord = indexOfLastRecord - count;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalRecords = data.length;

  // Calculate the range of records being shown
  const showingStart = indexOfFirstRecord + 1;
  const showingEnd = Math.min(indexOfLastRecord, totalRecords);

  return (
    <Sidebar>
      <div className="clear">
        <div className="section_heading">
          <h2 className="title_heading">CORS Subscription Plans</h2>
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
                <i className="fa-solid fa-calendar-plus"></i>&emsp; ADD
                Subscription Plan &emsp;
                <i className="fa-solid fa-caret-down cus-toggle"></i>
              </button>
            </div>
          </div>
          <div id="subscriptionForm" className="collapse">
            <div className="box_body">
              <form ref={formRef} className="plan-form" onSubmit={handleSubmit}>
                <div className="row mt-2">
                  <label className="col-md-2">
                    Plan <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      name="cors_plan"
                      type="text"
                      required
                      className="col-md-6"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <label className="col-md-2">
                    Description <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <textarea
                      name="cors_description"
                      className="col-md-6"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="row mt-2">
                  <label className="col-md-2">
                    Subscription Charges <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      name="subscription_charges"
                      type="text"
                      className="col-md-6"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <label className="col-md-2">
                    GST <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      name="GST_amt"
                      type="text"
                      required
                      className="col-md-6"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-2"></div>
                  <div className="col-md-4">
                    <button
                      className="btn btn-warning "
                      style={{ marginRight: "1rem" }}
                      onClick={discardChanges}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-success " type="submit">
                      Add Service
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <div className="box_header">
            <div style={{ padding: "5px 0px" }}>
              <i className="fa-regular fa-rectangle-list mx-3"></i>&nbsp; CORS
              Subscription Plans
            </div>
          </div>
          <div>
            <div className="box_body">
              <div className="row mb-2">
                <label className="col-md-2">Records per page:</label>
                <div className="col-md-2">
                  <select
                    className="form-select"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                  >
                    
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
              <div className="table-div-admin">
                <table className="data_table">
                  <thead >
                    <tr>
                      <th>SNo</th>
                      <th>Plan</th>
                      <th className="desc">Description</th>
                      <th style={{width:'8%'}}>Charges</th>
                      <th style={{width:'8%'}}>GST</th>
                      <th style={{width:'8%'}}>Total</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? ( currentRecords.map((elem, idx) => {
                      const originalIndex = indexOfFirstRecord + idx + 1;
                      return (
                        <tr key={idx}>
                          <td>{originalIndex}</td>
                          <td>{elem.cors_plan}</td>
                          <td className="desc">{elem.cors_description}</td>
                          <td>
                            ₹ {Number(elem.subscription_charges).toFixed(2)}
                          </td>
                          <td>₹ {Number(elem.GST_amt).toFixed(2)}</td>
                          <td>
                            ₹{" "}
                            {(
                              Number(elem.subscription_charges) +
                              Number(elem.GST_amt)
                            ).toFixed(2)}
                          </td>
                          <td>
                            <button
                              className="btn"
                              onClick={() => handleEdit(idx)}
                            >
                              <i className="fa-solid fa-pen-to-square fa-2x text-dark"></i>
                            </button>{" "}
                          </td>
                          <td>
                            <button
                              className="btn"
                              onClick={() => handleDelete(idx)}
                            >
                              <i className="fa-solid fa-trash-can fa-2x text-danger"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    }) ): 
                      (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No data available
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
              {totalRecords > count && (
              <div className="d-md-flex d-sm-block justify-content-between mt-2">
                <Pagination
                  totalItems={totalRecords}
                  itemsPerPage={count}
                  currentPage={currentPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
                <div className="mx-2">
                  <span>
                    Showing {showingStart} to {showingEnd} of {totalRecords}{" "}
                    records
                  </span>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default CorsPlans;