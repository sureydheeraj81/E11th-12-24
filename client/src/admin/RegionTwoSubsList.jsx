import React, { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import { CountSearchSubsPayment } from "../services/Apis";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const RegionTwoSubsList = () => {
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    limit: 10,
    status: "Approved",
  });

  const [debouncedName, setDebouncedName] = useState(inputs.name); // Debounced value for name

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = (e) => {};

  const subscriptionData = async () => {
    try {
      let response = await CountSearchSubsPayment(inputs, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      if (response.success) {
        setData(
          response.data.data.filter(
            (elem) =>
              elem.status === "Approved" && elem.region_name === "region-2"
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error in getting accepted subscription lis");
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "RegionTwoSubscriptionList.xlsx");
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
            className="mb-2 bg-secondary text-white  py-2 px-2"
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
              Region-2 Subscriptions: {data.length}
            </div>
          </div>
          <div>
            <div className="box_body">
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
                <table className=" data_table">
                  <thead>
                    <tr>
                      <th>SNo</th>
                      <th>Ack. No</th>
                      <th>Subs. Date/Time</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile No</th>
                      <th>Approved By</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "14px" }}>
                    {data.length > 0 ? (
                      data.map((elem, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{elem.ack_no}</td>
                            <td>{elem.date_created}</td>
                            <td>{elem.name}</td>
                            <td>{elem.email}</td>
                            <td>{elem.mobile}</td>
                            <td>{elem.approved_by}</td>
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

export default RegionTwoSubsList;
