import React, { useState, useMemo } from 'react';
import { getAllRegion1Data } from "../../services/Apis";
import { Link } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import * as XLSX from 'xlsx';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const RegionOneUserList = () => {
  const [inputs, setInputs] = useState('');
  const [count, setCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchApplications = async () => {
    try {
      const response = await getAllRegion1Data();
      return response.data.RegionOneData;
    } catch (error) {
      toast.error('Error fetching data:', error);
      return [];
    }
  };

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["pendingUsers"],
    queryFn: fetchApplications,
    onSuccess: () => {
      toast.success('Data loaded successfully!');
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
    },
  });

  const filteredUsers = useMemo(() => {
    return Array.isArray(data)
      ? data.filter(user =>
        [user.name, user.email, user.application_no, user.username, user.mobile_no, user.region]
          .some(field => field?.toLowerCase().includes(inputs.toLowerCase()))
      )
      : [];
  }, [data, inputs]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * count;
    const endIndex = startIndex + count;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, count]);

  const totalPages = Math.ceil(filteredUsers.length / count);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleChange = (e) => {
    setCount(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const exportToExcel = () => {
    const simplifiedData = paginatedUsers.map((user,index) => ({
      "S.No.":index+1,
      "Application No": user.application_no,
      "Reg. Date/Time": user.date_created,
      "User Information": `Name: ${user.name} \nEmail: ${user.email} \nPhone: ${user.mobile_no} \nUser Type: ${user.usertype} \nOrganization: ${user.company_name} \nRegion: ${user.region}`,
      "Account Status": user.is_rejected ,
      "Update By":`${user.modified_by}-${user.date_modified}`,
    }));
    const ws = XLSX.utils.json_to_sheet(simplifiedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Region1Users_Page_' + currentPage + '.xlsx');


  };

  return (
    <Sidebar>
      <div className="clear mb-3">
        <div className="section_heading">
          <h2 className="title_heading">CORS Registration List</h2>
        </div>
        <div className="d-flex justify-content-end">
          <div
            className="mb-2 bg-secondary text-white py-2 px-2"
            style={{ borderRadius: "5px", cursor: "pointer" }}
            onClick={exportToExcel}
            disabled={data.length === 0}
          >
            Export to Excel
          </div>
        </div>
        <div>
          <div className="box_header">
            <div style={{ padding: "5px 0px" }}>
              <i className="fa-regular fa-rectangle-list mx-3"></i>&nbsp; Total
              Region-1 Users: <b>{data.length}</b>
            </div>
          </div>
          <div>
            <div className="box_body">
              <form className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                <div className="col-12 col-md-6 d-flex align-items-center mb-3 mb-md-0">
                  <label className="me-2">Records per page:</label>
                  <select
                    className="form-select"
                    value={count}
                    onChange={handleChange}
                    style={{ width: "auto" }}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-end">
                  <input
                    type="text"
                    value={inputs}
                    onChange={(e) => setInputs(e.target.value)}
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
                      <th>Application No</th>
                      <th>Reg. Date/Time</th>
                      <th className="desc">User Information</th>
                      <th>Account Status</th>
                      <th>Update By</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "14px" }}>
                    {paginatedUsers.length > 0 ? (
                      paginatedUsers.map((app, index) => (
                        <tr key={app.application_no} className="bg-success text-white">
                          <td>{(currentPage - 1) * count + index + 1}</td>
                          <td>{app.application_no}</td>
                          <td>{app.date_created}</td>
                          <td className="desc">
                            <div>
                              Name: {app.name} <br />
                              Email: {app.email} <br />
                              Phone: {app.mobile_no} <br />
                              User Type: {app.usertype} <br />
                              Organization: {app.company_name} <br />
                              Region: {app.region} <br />
                            </div>
                          </td>
                          <td>
                            <div>{app.is_rejected}</div>
                          </td>
                          <td><span>{app.modified_by}</span><span>{app.date_modified}</span></td>
                          <td>
                            <button className="btn">
                              <Link
                                to={`/admin/approved/${app.sno}`}
                                className="text-decoration-none text-dark"
                              >
                                <i className="fa-regular fa-pen-to-square text-dark fa-2x"></i>
                              </Link>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colspan="8" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {filteredUsers.length > count && (
              <div className="pagination-controls d-flex justify-content-space-between mt-3">
                <div className="pagination-controls  mt-3">
                  <button className="btn btn-primary mx-1" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}> « Previous</button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} className={`btn mx-1 ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                  ))}


                  <button className="btn btn-primary mx-1" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next »</button>
                </div>
                <p className="mt-4">Showing 1 to {count} of {data.length} entries </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default RegionOneUserList;