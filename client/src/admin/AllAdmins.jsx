import React, { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import toast from "react-hot-toast";
import { getAllAdmin } from "../services/Apis";

const AllAdmins = () => {
  const [data, setData] = useState([]);

  const getAllAdminData = async () => {
    try {
      let response = await getAllAdmin({
        Authorization: "Bearer " + localStorage.getItem("token"),
      });
      setData(response.data.data);
    } catch (error) {
      toast.error("Error in All admin page", error);
    }
  };

  useEffect(() => {
    getAllAdminData();
  }, []);

  return (
    <Sidebar>
      <div className="clear">
        <div className="section_heading">
          <h2 className="title_heading">Admin details</h2>
        </div>
        <div>
          <div>
            <div className="box_header">
              <div style={{ padding: "5px 0px" }}>
                <i className="fa-regular fa-rectangle-list"></i>&emsp; List of
                all admins
              </div>
            </div>
            <div>
              <div className="box_body">
                <div>
                  <table className=" data_table">
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th className="desc">Full Name</th>
                        <th className="desc">Username</th>
                        <th>Mobile Number</th>
                        <th>Designation</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((elem, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td className="desc">{elem.full_name}</td>
                              <td className="desc">{elem.username}</td>
                              <td>{elem.mobile}</td>
                              <td>{elem.designation}</td>
                              <td
                                style={{
                                  color:
                                    elem.status === "Active"
                                      ? "green"
                                      : elem.status === "Pending"
                                      ? "#F7CB73"
                                      : elem.status === "Deleted"
                                      ? "red"
                                      : elem.status === "Blocked"
                                      ? "orange"
                                      : "transparent",
                                }}
                              >
                                {elem.status}
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

export default AllAdmins;
