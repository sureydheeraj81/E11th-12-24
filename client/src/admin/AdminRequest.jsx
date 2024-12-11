import React, { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import { deleteAdminRequest, getAllAdmin, updateAdminStatus } from "../services/Apis";
import toast from "react-hot-toast";

const AdminRequest = () => {

  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState({
    username: "",
    usertype: "",
    status: "",
    modified_by: "",
  })

  const getAllAdminData = async () => {
    try {
      let response = await getAllAdmin({
        Authorization: "Bearer " + localStorage.getItem("token"),
      },);
      let filteredData = response.data.data.filter((elem) => {
        return elem.status === "Pending";
      });
      setData(filteredData);
    } catch (error) {
      toast.error("Error in All admin page", error);
    }
  };

  const handleAccept = async (idx) => {

    inputs.username = data[idx].username;
    inputs.usertype = data[idx].usertype;
    inputs.status = "Active";
    inputs.modified_by = "superadmin"

    try {
      let response = await updateAdminStatus(inputs);
      if(response.data.success){
        toast.success(response.data.message);
        getAllAdminData();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Error in Admin request page !");
    }
  }

  const handleDelete = async (idx) => {

    inputs.username = data[idx].username;
    inputs.usertype = data[idx].usertype;

    try {
      let response = await deleteAdminRequest(inputs);
      if(response.data.success){
        toast.success(response.data.message);
        getAllAdminData();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Error in Admin request page !");
    }
    
  }

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
                pending request
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
                        <th>UserType</th>
                        <th>Status</th>
                        <th>Update</th>
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
                              <td>{elem.usertype}</td>
                              <td>{elem.status}</td>
                              <td style={{display: "flex", justifyContent: "space-between"}}>
                                <button
                                  className="btn btn-warning"
                                  onClick={() =>handleAccept(idx)}
                                >
                                  <i className="fa-regular fa-circle-check"></i>
                                </button>
                                <button className="btn btn-danger" onClick={()=>handleDelete(idx)}>
                                  <i className="fa-regular fa-trash-can"></i>
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
      </div>
    </Sidebar>
  );
};

export default AdminRequest;
