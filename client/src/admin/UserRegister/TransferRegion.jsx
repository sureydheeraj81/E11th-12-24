import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { fetchAllTrans, regionTransfer } from "../../services/Apis";
import Sidebar from "../layout/Sidebar";

const TransferRegion = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [fetchData, setFetchData] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await fetchAllTrans();
      setFetchData(data.AcceptedData || []);
    } catch (error) {
      toast.error("Error fetching users!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = fetchData.filter((user) =>
    ["name", "email", "username", "application_no", "mobile_no", "region"]
      .some((field) => user[field]?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getSelectedUserRegion = () => {
    const user = fetchData.find((user) => user.sno === selectedUser);
    return user ? (user.region === "region-1" ? "region-2" : "region-1") : "N/A";
  };

  const transferRegion = async () => {
    const userToUpdate = fetchData.find((user) => user.sno === selectedUser);
    if (!userToUpdate) {
      toast.error("No user selected!");
      return;
    }
    console.log(userToUpdate);

    try {
      const res = await regionTransfer(userToUpdate);
      if (res.data.success) {
        toast.success("User region transferred successfully!");
        fetchUsers(); 
      } else {
        toast.error(res.data.message || "Error transferring region!");
      }
    } catch (error) {
      toast.error("Error transferring user region!");
      if (error.response?.data?.success === false) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleSelect = (id) => setSelectedUser(id);

  return (
    <Sidebar>
      <div className="clear mb-3">
        <div className="section_heading">
          <h2 className="title_heading">Transfer Region</h2>
        </div>
        <div className="box_header">
          <div style={{ padding: "5px 0px" }}>
            <i className="fa-solid fa-right-left mx-2"></i> &emsp; Search User and Transfer Region
          </div>
        </div>
        <div>
          <div className="box_body">
           
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm.trim().length > 0 && (
              <div>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover data_table">
                    <thead className="table-primary">
                      <tr>
                        <th>Sno</th>
                        <th>Ack. No</th>
                        <th>Name</th>
                        <th>Email ID</th>
                        <th>Mobile No</th>
                        <th>Username</th>
                        <th>Region</th>
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                          <tr key={index}>
                            {/* <td>{index + 1}</td> */}
                            <td>{user.sno}</td>

                            <td>{user.application_no}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile_no}</td>
                            <td>{user.username}</td>
                            <td>{user.region}</td>
                            <td>
                              <input
                                type="radio"
                                name="selectUser"
                                checked={selectedUser === user.sno}
                                onChange={() => handleSelect(user.sno)}
                                aria-label={`Select user ${user.name}`}
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              
                {selectedUser === null || filteredUsers.length === 0 || getSelectedUserRegion() === "N/A" ? (
                  <button className="btn btn-success w-100 mt-3" disabled>
                    Transfer
                  </button>
                ) : (
                  <button
                    className="btn btn-success w-100 mt-3"
                    onClick={transferRegion}
                  >
                    Transfer User at S.No {selectedUser} to {getSelectedUserRegion()}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default TransferRegion;











