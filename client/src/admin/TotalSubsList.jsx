import React, { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import toast from "react-hot-toast";
import { CountSearchSubsPayment } from "../services/Apis";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const TotalSubsList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    limit: 10,
    status: "",
  });

  const [debouncedName, setDebouncedName] = useState(inputs.name); // Debounced value for name

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = (idx) => {
    navigate("/admin/update-subs-status", { state: data[idx] });
  };

  const subscriptionData = async () => {
    try {
      let response = await CountSearchSubsPayment(inputs, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      if (response.success) {
        setData(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error in getting all subscription");
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "TotalSubscriptionList.xlsx");
  };

  // Debounce logic for 'name' field
  useEffect(() => {
    // Set a timeout to delay the update of debounced name
    const timeoutId = setTimeout(() => {
      setDebouncedName(inputs.name);
    }, 500);

    // Cleanup function to clear timeout on each re-render
    return () => clearTimeout(timeoutId);
  }, [inputs.name]);

  useEffect(() => {
    subscriptionData();
  }, [debouncedName, inputs.limit]);

  return (
    <Sidebar>
      <div className="clear">
        <div className="section_heading">
          <h2 className="title_heading">CORS Subscription List</h2>
        </div>
        <div className="d-flex justify-content-end">
          <div
            className="mb-2 bg-secondary text-white py-2 px-2"
            style={{ borderRadius: "5px", cursor: "pointer" }}
            onClick={exportToExcel}
            disabled={data.length === 0}
          >
            Export table to Excel
          </div>
        </div>
        <div>
          <div className="box_header">
            <div style={{ padding: "5px 0px" }}>
              <i className="fa-regular fa-rectangle-list mx-3"></i>&nbsp; Total
              Subscriptions: {data.length}
            </div>
          </div>
          <div>
            <div className="box_body">
              <div>
                <center>
                  <h5>
                    <b>Color Denoted to</b>
                  </h5>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <div className="bg-light p-1 me-1 border rounded">
                            Pending
                          </div>
                        </th>
                        <th>
                          <div className="bg-primary text-white  me-1 p-1 border rounded">
                            Verified
                          </div>
                        </th>
                        <th>
                          <div className="bg-success text-white me-1 p-1 border rounded">
                            Active
                          </div>
                        </th>

                        <th>
                          <div className="bg-danger text-white p-1 border rounded">
                            Rejected
                          </div>
                        </th>
                      </tr>
                    </thead>
                  </table>
                </center>
              </div>
              <form className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                <div className="col-12 col-md-6 d-flex align-items-center mb-3 mb-md-0">
                  <label className="me-2">Records per page:</label>
                  <select
                    type="number"
                    name="limit"
                    className="form-select"
                    value={inputs.limit}
                    onChange={handleChange}
                    style={{ width: "auto" }}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-end">
                  <input
                    type="text"
                    name="name"
                    value={inputs.name}
                    onChange={handleChange}
                    placeholder="Search here ..."
                    className="form-control"
                    style={{
                      maxWidth: "300px",
                    }}
                  />
                </div>
              </form>
              <div className="table-div-admin">
                <table className="data_table w-100">
                  <thead>
                    <tr>
                      <th>SNo</th>
                      <th>Ack. No</th>
                      <th>Subs. Date/Time</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile No</th>
                      <th>Update By</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "14px" }}>
                    {data.length > 0 ? (
                      data.map((elem, idx) => {
                        const statusClass =
                          elem.status === "Approved"
                            ? "bg-success text-white"
                            : elem.status === "Pending"
                            ? "bg-light"
                            : elem.status === "Verified"
                            ? "bg-primary text-white"
                            : elem.status === "Rejected"
                            ? "bg-danger text-white"
                            : "bg-light";
                        return (
                          <tr key={idx} className={statusClass}>
                            <td>{idx + 1}</td>
                            <td>{elem.ack_no}</td>
                            <td>{elem.date_created}</td>
                            <td>{elem.name}</td>
                            <td>{elem.email}</td>
                            <td>{elem.mobile}</td>
                            <td>
                              <div>
                                {elem.rejected_by
                                  ? elem.rejected_by
                                  : elem.approved_by
                                  ? elem.approved_by
                                  : elem.payment_verified_by
                                  ? elem.payment_verified_by
                                  : null}
                              </div>
                              <div>
                                {elem.status === "Rejected"
                                  ? elem.rejected_date
                                  : elem.status === "Approved"
                                  ? elem.approved_date
                                  : elem.status === "Verified"
                                  ? elem.payment_verification_date
                                  : null}
                              </div>
                            </td>
                            <td>
                              <button
                                className="btn"
                                onClick={() => handleEdit(idx)}
                              >
                                <i className="fa-regular fa-pen-to-square text-dark fa-2x"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
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
    </Sidebar>
  );
};

export default TotalSubsList;
