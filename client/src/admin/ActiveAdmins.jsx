import React, { useEffect, useState } from 'react'
import Sidebar from './layout/Sidebar';
import { getAllAdmin } from '../services/Apis';
import { useNavigate } from 'react-router-dom';

const ActiveAdmins = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([])

  const getAllAdminData = async() => {
    try {
      let response = await getAllAdmin({
        Authorization: "Bearer " + localStorage.getItem("token"),
      });
      let filteredData = response.data.data.filter((elem)=>{
        return elem.status === "Active";
      })
      setData(filteredData)
    } catch (error) {
      toast.error("Error in All admin page", error)
    }
  }

  const handleEdit = async(idx) => {
    navigate(`/admin/dashboard/edit-status/${data[idx].sno}`, {state: data[idx]})
  }

  useEffect(()=>{
    getAllAdminData();
  },[])

  return (
    <Sidebar>
      <div className="clear">
        <div className="section_heading">
          <h2 className="title_heading">Active Admins</h2>
        </div>
        <div>
          <div>
            <div className="box_header">
              <div style={{ padding: "5px 0px" }}>
                <i className="fa-regular fa-rectangle-list"></i>&emsp; List of
                all active admins
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
                              <td>
                                <button
                                  className="btn"
                                  onClick={() =>handleEdit(idx)}
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
      </div>
    </Sidebar>
  )
}
export default ActiveAdmins

