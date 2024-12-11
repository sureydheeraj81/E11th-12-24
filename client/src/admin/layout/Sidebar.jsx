import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { AllSubsPaymentDetails, getAdminInfo, logoutAdmin } from "../../services/Apis";
import AdminHeader from "./AdminHeader";
import "../styles/sidebar.css";
import * as XLSX from "xlsx";

const Sidebar = ({ children }) => {
  const [info, setInfo] = useState([]);
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  const logouthandle = async () => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      let response = await logoutAdmin(token);

      if (response.data.success) {
        localStorage.clear();
        toast.success(response.data.message);
        window.location.href = "/admin/login";
      }
    } catch (error) {
      toast.error("Error in logout page!");
    }
  };

  const getAdminInfoId = async () => {
    try {
      if (info.length === 0) {
        let response = await getAdminInfo({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        });
        if (response.success) {
          setInfo(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Error in getting admin info");
    }
  };

  const exportToCSV = async () => {
    
    try {
      let response = await AllSubsPaymentDetails({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      if (response.success) {
        const filteredData = response.data.data.map(
          ({
            ack_no,
            approved_date,
            user_reg_id,
            name,
            address,
            email,
            mobile,
            state_id,
            GST_name,
            GST_number,
            subs_receiptAmt,
            gst_receiptAmt,
            subs_receiptNo,
            gst_receiptNo,
            challan_no,
            // approved_date,
          }) => ({
            ack_no,
            approved_date,
            user_reg_id,
            name,
            address,
            email,
            mobile,
            state_id,
            GST_name,
            GST_number,
            subs_receiptAmt,
            gst_receiptAmt,
            subs_receiptNo,
            gst_receiptNo,
            challan_no,
            // approved_date,
          })
        );

        const header = [
          "Ack No.",
          "Subs Date",
          "User Name",
          "Depositor Name",
          "Depositor Address",
          "Depositor Email",
          "Depositor Mobile",
          "State",
          "GST Name",
          "GST Number",
          "Total Subs Amount",
          "Total GST Amount",
          "Sub Rct No.",
          "GST Rct No.",
          "Invoice ID",
          "Challan Number",
          "Challan Date",
        ];

        const mappedData = filteredData.map((row) => ({
          "Ack No.": row.ack_no,
          "Subs Date": row.approved_date, // Mapping approved_date to "Subs Date"
          "User Name": row.user_reg_id,   // Mapping user_reg_id to "User Name"
          "Depositor Name": row.name,
          "Depositor Address": row.address,
          "Depositor Email": row.email,
          "Depositor Mobile": row.mobile,
          "State": row.state_id,
          "GST Name": row.GST_name,
          "GST Number": row.GST_number,
          "Total Subs Amount": row.subs_receiptAmt,
          "Total GST Amount": row.gst_receiptAmt,
          "Sub Rct No.": row.subs_receiptNo,
          "GST Rct No.": row.gst_receiptNo,
          "Invoice ID": row.user_reg_id,  // Assuming Invoice ID is same as user_reg_id
          "Challan Number": row.challan_no,
          "Challan Date": row.approved_date, // Assuming Challan Date is the same as approved_date
        }));

        const ws = XLSX.utils.json_to_sheet(mappedData);
        ws["!cols"] = header.map(() => ({ wch: 20 })); 
        
        const csv = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Subscription_Details.csv";
        link.click();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error in exporting csv file");
    }
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    getAdminInfoId();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <AdminHeader />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div
            className="col-auto col-md-3 col-xl-2 px-sm-2 px-2 text-white"
            style={{ backgroundColor: "#002147", fontSize: "14px" }}
          >
            <div className="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100">
              <Link
                to="/admin/dashboard"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span className="fs-5 d-none d-sm-inline">
                  CORS Admin Portal
                </span>
              </Link>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="nav-item">
                  <NavLink
                    to="/admin/dashboard"
                    className="nav-link align-middle px-2 text-white"
                    title={isMobile ? "Dashboard" : ""}
                  >
                    <i className="fa-solid fa-chart-line me-2"></i>
                    <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <Link
                    to="#submenu1"
                    data-bs-toggle="collapse"
                    className="nav-link px-2 text-white align-middle"
                    title={isMobile ? "Registration List" : ""}
                  >
                    <i className="fa-solid fa-users me-2"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Registration List
                    </span>
                  </Link>
                  <ul
                    className="collapse nav flex-column ms-1"
                    id="submenu1"
                    data-bs-parent="#menu"
                  >
                    <li className="w-100">
                      <NavLink
                        to="/admin/user-list"
                        className="nav-link px-2 text-white"
                        title={isMobile ? "Total Users List" : ""}
                      >
                        <i className="fa-solid fa-list me-2"></i>
                        <span className="d-none d-sm-inline">
                          Total Users List
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/user-accepted-list"
                        className="nav-link px-2 text-white"
                        title={isMobile ? "Accepted Users List" : ""}
                      >
                        <i className="fa-solid fa-user-check me-2"></i>
                        <span className="d-none d-sm-inline">
                          Accepted Users List
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/user-rejected-list"
                        className="nav-link px-2 text-white"
                        title={isMobile ? "Rejected Users List" : ""}
                      >
                        <i className="fa-solid fa-user-xmark me-2"></i>
                        <span className="d-none d-sm-inline">
                          Rejected Users List
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/user-pending-list"
                        className="nav-link px-2 text-white"
                        title={isMobile ? "Pending Users List" : ""}
                      >
                        <i className="fa-solid fa-user-pen me-2"></i>
                        <span className="d-none d-sm-inline">
                          Pending Users List
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/user-r1-list"
                        className="nav-link px-2 text-white"
                        title={isMobile ? "Region-1 Users List" : ""}
                      >
                        <i className="fa-solid fa-user-group me-2"></i>
                        <span className="d-none d-sm-inline">
                          Region-1 Users List
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/user-r2-list"
                        className="nav-link px-2 text-white"
                        title={isMobile ? "Region-2 Users List" : ""}
                      >
                        <i className="fa-solid fa-user-group me-2"></i>
                        <span className="d-none d-sm-inline">
                          Region-2 Users List
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    to="#submenu2"
                    data-bs-toggle="collapse"
                    className="nav-link px-2 text-white align-middle "
                    title={isMobile ? "Subscription List" : ""}
                  >
                    <i className="fa-solid fa-list me-2 "></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Subscription List
                    </span>
                  </Link>
                  <ul
                    className="collapse nav flex-column ms-1"
                    id="submenu2"
                    data-bs-parent="#menu"
                  >
                    <li className="w-100">
                      <NavLink
                        to="/admin/subscription-list"
                        className="nav-link px-2 text-white"
                        title={isMobile ? "Total Users List" : ""}
                      >
                        <i className="fa-solid fa-users me-2 "></i>
                        <span className="d-none d-sm-inline">
                          Total Users List
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/subscription-accepted-list"
                        className="nav-link px-2 text-white"
                        title={isMobile ? "Accepted Users List" : ""}
                      >
                        <i className="fa-solid fa-user-check me-2"></i>
                        <span className="d-none d-sm-inline">
                          Accepted Users List
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/subscription-rejected-list"
                        className="nav-link px-2 text-white"
                        title={isMobile ? "Rejected Users List" : ""}
                      >
                        <i className="fa-solid fa-user-xmark me-2 "></i>
                        <span className="d-none d-sm-inline">
                          Rejected Users List
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/subscription-verified-list"
                        className="nav-link px-2 text-white"
                        title={isMobile ? "Verified Users List" : ""}
                      >
                        <i className="fa-solid fa-user-pen me-2 "></i>
                        <span className="d-none d-sm-inline">
                          Verified Users List
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/subscription-pending-list"
                        className="nav-link px-2 text-white"
                        title={isMobile ? "Pending Users List" : ""}
                      >
                        <i className="fa-solid fa-user-clock me-2"></i>
                        <span className="d-none d-sm-inline">
                          Pending Users List
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/subscription-r1-list"
                        className="nav-link px-2 text-white"
                        title={isMobile ? "Region-1 Users List" : ""}
                      >
                        <i className="fa-solid fa-user-group me-2 "></i>
                        <span className="d-none d-sm-inline">
                          Region-1 Users List
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/subscription-r2-list"
                        className="nav-link px-2 text-white"
                        title={isMobile ? "Regoin-2 Users List" : ""}
                      >
                        <i className="fa-solid fa-user-group me-2 "></i>
                        <span className="d-none d-sm-inline">
                          Region-2 Users List
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <NavLink
                    to="/admin/user-transfer"
                    className="nav-link px-2 text-white align-middle"
                    title={isMobile ? "Transfer region" : ""}
                  >
                    <i className="fa-solid fa-arrow-right-arrow-left me-2"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Transfer Region
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/services"
                    className="nav-link px-2 text-white align-middle"
                    title={isMobile ? "CORS Services" : ""}
                  >
                    <i className="fa-solid fa-gear me-2 "></i>
                    <span className="ms-1 d-none d-sm-inline">
                      CORS Services
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/reg-rejection"
                    className="nav-link px-2 text-white align-middle"
                    title={isMobile ? "Regs. Rejection List" : ""}
                  >
                    <i className="fa-solid fa-user-large-slash me-2 "></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Regs. Rejection List
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/sub-rejection"
                    className="nav-link px-2 text-white align-middle"
                    title={isMobile ? "Subs. Rejection List" : ""}
                  >
                    <i className="fa-solid fa-ban me-2 "></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Subs. Rejection List
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/user-categories"
                    className="nav-link px-2 text-white align-middle"
                    title={isMobile ? "User Categories" : ""}
                  >
                    <i className="fa-solid fa-table-list me-2 "></i>
                    <span className="ms-1 d-none d-sm-inline">
                      User Categories
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/usage-details"
                    className="nav-link px-2 text-white align-middle"
                    title={isMobile ? "Usage Details" : ""}
                  >
                    <i className="fa-solid fa-database me-2 "></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Usage Details
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/feedbacks"
                    className="nav-link px-2 text-white align-middle"
                    title={isMobile ? "Feedbacks" : ""}
                  >
                    <i className="fa-solid fa-comment me-2 "></i>
                    <span className="ms-1 d-none d-sm-inline">Feedbacks</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={exportToCSV}
                    className="nav-link px-2 text-white align-middle"
                    title={isMobile ? "Report-D2" : ""}
                  >
                    <i className="fa-solid fa-file-csv me-2 "></i>
                    <span className="ms-1 d-none d-sm-inline">Report D2</span>
                  </NavLink>
                </li>
                <hr />
                <div className="dropdown pb-4">
                  <Link
                    to="#"
                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={
                        info.profilePic
                          ? `/${info.profilePic}`
                          : "/public/uploads/profile.png"
                      }
                      alt="profile"
                      width="30"
                      height="30"
                      className="rounded-circle"
                    />
                    <span className="d-none d-sm-inline mx-2">
                      {info.full_name}
                    </span>
                  </Link>
                  <ul
                    className="dropdown-menu text-small"
                    aria-labelledby="dropdownUser1"
                  >
                    <li>
                      <Link
                        className="dropdown-item text-white"
                        state={info}
                        to="/admin/profile"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-white"
                        state={info}
                        to="/admin/change-password"
                      >
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-white"
                        onClick={logouthandle}
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </div>
          <div className="col px-2">{children}</div>
        </div>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{
          backgroundColor: "#002147",
          color: "#fff",
          padding: "5px",
          fontSize: "13px",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <div>
          &copy; {currentYear} CORS | Survey of India | All rights reseved.
        </div>
      </div>
    </>
  );
};

export default Sidebar;
