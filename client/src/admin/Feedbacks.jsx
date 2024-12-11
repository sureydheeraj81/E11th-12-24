import { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import toast from "react-hot-toast";
import "./styles/services-cors.css";
import { getFeedbacks, updateFeedback } from "../services/Apis";
import Pagination from "./components/Pagination";

const Feedbacks = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const fetchFeedbackData = async () => {
    try {
      const response = await getFeedbacks();
      if (response.data.success) {
        setData(response.data.data || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Some error occured in fetching data");
    }
  };

  const handleToggle = async (idx) => {
    const feedbackId = data[idx].sno;
    try {
      const response = await updateFeedback(feedbackId, { status: "Resolved" });
      console.log(response);
      if (response.data.success) {
        const updatedData = [...data];
        updatedData[idx].status = "Resolved";
        setData(updatedData);
        toast.success("Feedback marked as resolved");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Some error occurred in updating the feedback status");
    }
  };

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalRecords = data.length;

  // Calculate the range of records being shown
  const showingStart = indexOfFirstRecord + 1;
  const showingEnd = Math.min(indexOfLastRecord, totalRecords);

  return (
    <>
      <Sidebar>
        <div className="clear">
          <div className="section_heading">
            <h2 className="title_heading">Feedbacks</h2>
          </div>
          <div>
            <div className="box_header">
              <div style={{ padding: "5px 0px" }}>
                <i className="fa-solid fa-comments mx-2"></i>&emsp; Feedback
                List
              </div>
            </div>
            <div>
              <div className="box_body">
                <div className="row mb-2">
                  <label className="col-md-2">Records per page:</label>
                  <div className="col-md-2">
                    <select
                      className="form-select"
                      value={recordsPerPage}
                      onChange={(e) =>
                        setRecordsPerPage(Number(e.target.value))
                      }
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                    </select>
                  </div>
                </div>
                <div className="table-div-admin">
                  <table className=" data_table">
                    <thead className="table-primary">
                      <tr>
                        <th style={{ width: "5%" }}>SNo.</th>
                        <th className="desc" style={{ width: "25%" }}>
                          Sender's Details
                        </th>
                        <th className="desc" style={{ width: "45%" }}>
                          Feedback
                        </th>
                        <th style={{ width: "10%" }}>Status</th>
                        <th style={{ width: "15%" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecords.length > 0 ? (
                        currentRecords.map((elem, idx) => {
                          const originalIndex = indexOfFirstRecord + idx + 1;
                          return (
                            <tr key={idx}>
                              <td>{originalIndex}</td>
                              <td className="desc feed-desc">
                                <div>Name: {elem.name}</div>
                                <div>
                                  {elem.mobile
                                    ? `Mobile: ${elem.mobile}`
                                    : null}
                                </div>
                                <div>
                                  {elem.email ? `Email: ${elem.email}` : null}
                                </div>
                                <div>Submitted On: {elem.createdAt},</div>
                                <div>
                                  {elem.updatedAt === elem.createdAt
                                    ? `Updated At: ${"N/A"}`
                                    : `Updated At: ${elem.updatedAt}`}
                                </div>
                              </td>
                              <td className="desc">{elem.feedback}</td>
                              <td>
                                {elem.status === "Pending" ? (
                                  <i
                                    className="fa-solid fa-clock fa-2xl text-warning"
                                  ></i>
                                ) : (
                                  <i
                                    className="fa-solid fa-circle-check fa-2xl text-success "
                                  ></i>
                                )}
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleToggle(idx)}
                                >
                                  {elem.status === "Pending"
                                    ? "Mark as Resolved"
                                    : "Resolved"}
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
                <div className="d-sm-flex d-sm-block justify-content-between mt-2">
                  <Pagination
                    totalItems={totalRecords}
                    itemsPerPage={recordsPerPage}
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
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Feedbacks;
