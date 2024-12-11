import React, { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import { Link } from "react-router-dom";
import "./styles/dashboard.css";
import AdminHeader from "./layout/AdminHeader";
import { DataChartReg, DataChart } from "./DataChart";
import toast from "react-hot-toast";

import {
  // getAllAdmin,
  // AllSubsPaymentDetails,
  // getUsageDetails,
  getAdminInfo,
  getAllRegion12GPA

} from "../services/Apis";

const AdminDashboard = () => {
  const [usertype, setUsertype] = useState("viewer");
  const [data, setData] = useState([]);
  const [adminData1, setAdminData1] = useState([]);
  const [regData1, setRegData1] = useState([]);
  const [regData, setRegData] = useState([]);
  const [countGPA, setsetCountGPA] = useState([]);
  const [subsData1, setSubsData1] = useState([]);

  const userDetailsType = [
    {
      userType: "Government Users",
      region1: countGPA.region1 ? countGPA.region1.govtUserData : 0,
      region2: countGPA.region2 ? countGPA.region2.govtUserData : 0,

    },
    {
      userType: "Private Users",
      region1: countGPA.region1 ? countGPA.region1.privUserData : 0,
      region2: countGPA.region2 ? countGPA.region2.privUserData : 0,
    },
    {
      userType: "Academic Users",
      region1: countGPA.region1 ? countGPA.region1.acadUserData : 0,
      region2: countGPA.region2 ? countGPA.region2.acadUserData : 0,
    },
  ];



  // const userDetailsType = [
  //   {
  //     userType: "Government Users",
  //     region1:
  //       regData.filter(
  //         (elem) =>
  //           elem.is_rejected === "Approved" &&
  //           elem.region === "region-1" &&
  //           elem.usertype === "Govt User"
  //       ).length || 0,
  //     region2:
  //       regData.filter(
  //         (elem) =>
  //           elem.is_rejected === "Approved" &&
  //           elem.region === "region-2" &&
  //           elem.usertype === "Govt User"
  //       ).length || 0,
  //   },
  //   {
  //     userType: "Private Users",
  //     region1:
  //       regData.filter(
  //         (elem) =>
  //           elem.is_rejected === "Approved" &&
  //           elem.region === "region-1" &&
  //           elem.usertype === "Private User"
  //       ).length || 0,
  //     region2:
  //       regData.filter(
  //         (elem) =>
  //           elem.is_rejected === "Approved" &&
  //           elem.region === "region-2" &&
  //           elem.usertype === "Private User"
  //       ).length || 0,
  //   },
  //   {
  //     userType: "Academic Users",
  //     region1:
  //       regData.filter(
  //         (elem) =>
  //           elem.is_rejected === "Approved" &&
  //           elem.region === "region-1" &&
  //           elem.usertype === "Research/Academic User"
  //       ).length || 0,
  //     region2:
  //       regData.filter(
  //         (elem) =>
  //           elem.is_rejected === "Approved" &&
  //           elem.region === "region-2" &&
  //           elem.usertype === "Research/Academic User"
  //       ).length || 0,
  //   },
  // ];

  // const industryTypeDetails = [
  //   {
  //     IndustryTypes: "Agriculture",
  //     region1:
  //       regData.filter(
  //         (elem) =>
  //           elem.is_rejected === "Approved" &&
  //           elem.region === "region-1" &&
  //           elem.category.toLowerCase() === "agriculture"
  //       ).length || 0,
  //     region2:
  //       regData.filter(
  //         (elem) =>
  //           elem.is_rejected === "Approved" &&
  //           elem.region === "region-2" &&
  //           elem.category.toLowerCase() === "agriculture"
  //       ).length || 0,
  //   },
  //   {
  //     IndustryTypes: "Aviation",
  //     region1:
  //       regData.filter(
  //         (elem) =>
  //           elem.is_rejected === "Approved" &&
  //           elem.region === "region-1" &&
  //           elem.category.toLowerCase() === "aviation"
  //       ).length || 0,
  //     region2:
  //       regData.filter(
  //         (elem) =>
  //           elem.is_rejected === "Approved" &&
  //           elem.region === "region-2" &&
  //           elem.category.toLowerCase() === "aviation"
  //       ).length || 0,
  //   },
  //   {
  //     IndustryTypes: "Climatology And Earth Sciences",
  //     region1: regData.filter(
  //       (elem) =>
  //         elem.is_rejected === "Approved" &&
  //         elem.region === "region-1" &&
  //         elem.category.toLowerCase() === "climatology and earth sciences"
  //     ).length || 0,
  //     region2: regData.filter(
  //       (elem) =>
  //         elem.is_rejected === "Approved" &&
  //         elem.region === "region-2" &&
  //         elem.category.toLowerCase() === "climatology and earth sciences"
  //     ).length || 0,
  //   },
  //   { IndustryTypes: "Communication And Navigation", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "communication and navigation"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "communication and navigation"
  //   ).length || 0 },
  //   { IndustryTypes: "Defence And Paramilitary", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "defence and paramilitary"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "defence and paramilitary"
  //   ).length || 0 },
  //   { IndustryTypes: "Disaster Management", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "disaster management"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "disaster management"
  //   ).length || 0},
  //   { IndustryTypes: "Drone Based Services", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "drone based services"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "drone based services"
  //   ).length || 0 },
  //   { IndustryTypes: "Engineering And Construction", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "engineering and construction"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "engineering and construction"
  //   ).length || 0 },
  //   {
  //     IndustryTypes: "Fisheries And Maritime Activities",
  //     region1: regData.filter(
  //       (elem) =>
  //         elem.is_rejected === "Approved" &&
  //         elem.region === "region-1" &&
  //         elem.category.toLowerCase() === "fisheries and maritime activities"
  //     ).length || 0,
  //     region2: regData.filter(
  //       (elem) =>
  //         elem.is_rejected === "Approved" &&
  //         elem.region === "region-2" &&
  //         elem.category.toLowerCase() === "fisheries and maritime activities"
  //     ).length || 0,
  //   },
  //   { IndustryTypes: "Forest And Environment", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "forest and environment"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "forest and environment"
  //   ).length || 0, },
  //   { IndustryTypes: "Geological And Geotechnical", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "geological and geotechnical"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "geological and geotechnical"
  //   ).length || 0, },
  //   { IndustryTypes: "Geospatial Development", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "geospatial development"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "geospatial development"
  //   ).length || 0, },
  //   { IndustryTypes: "Information Unavailable", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "information unavailable"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "information unavailable"
  //   ).length || 0, },
  //   { IndustryTypes: "Land Survey And Mapping", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "land survey and mapping"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "land survey and mapping"
  //   ).length || 0, },
  //   { IndustryTypes: "Logistics", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "logistics"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "logistics"
  //   ).length || 0, },
  //   { IndustryTypes: "Mining Industries", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "mining industries"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "mining industries"
  //   ).length || 0, },
  //   { IndustryTypes: "Other", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "other"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "other"
  //   ).length || 0, },
  //   {
  //     IndustryTypes: "Petroleum And Natural Gas Industries",
  //     region1: regData.filter(
  //       (elem) =>
  //         elem.is_rejected === "Approved" &&
  //         elem.region === "region-1" &&
  //         elem.category.toLowerCase() === "petroleum and natural gas industries"
  //     ).length || 0,
  //     region2: regData.filter(
  //       (elem) =>
  //         elem.is_rejected === "Approved" &&
  //         elem.region === "region-2" &&
  //         elem.category.toLowerCase() === "petroleum and natural gas industries"
  //     ).length || 0,
  //   },
  //   { IndustryTypes: "Remote Sensing Applications", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "remote sensing applications"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "remote sensing applications"
  //   ).length || 0, },
  //   { IndustryTypes: "Research & Development", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "research & development"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "research & development"
  //   ).length || 0, },
  //   { IndustryTypes: "Telecommunication", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "telecommunication"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "telecommunication"
  //   ).length || 0, },
  //   { IndustryTypes: "Transportation", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "transportation"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "transportation"
  //   ).length || 0, },
  //   { IndustryTypes: "Urban And Rural Development", region1: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-1" &&
  //       elem.category.toLowerCase() === "urban and rural development"
  //   ).length || 0, region2: regData.filter(
  //     (elem) =>
  //       elem.is_rejected === "Approved" &&
  //       elem.region === "region-2" &&
  //       elem.category.toLowerCase() === "urban and rural development"
  //   ).length || 0, },
  // ];

  const admindetailsData = [
    {
      counts: adminData1.totalAdmin,
      message1: "Total",
      message2: "Admins",
      to: "all-admins",
    },
    {
      counts: adminData1.active,
      message1: "Total",
      message2: "Active Admins",
      to: "active-admins",
    },
    {
      counts: adminData1.blocked,
      message1: "Total",
      message2: "Blocked Admins",
      to: "admin-blocked",
    },
    {
      counts: adminData1.pending,
      message1: "Total",
      message2: "Pending Request",
      to: "admin-request",
    },
  ];

  const registrationCards = [
    {
      counts: regData1.total,
      message1: "Total",
      message2: "Request Recieved",
      to: "user-list",
    },
    {
      counts: regData1.allVarified,
      message1: "Total",
      message2: "Request Accepted",
      to: "user-accepted-list",
    },
    {
      counts: regData1.rejectedData,
      message1: "Total",
      message2: "Request Rejected",
      to: "user-rejected-list",
    },
    {
      counts: regData1.pendingData,
      message1: "Total",
      message2: "Request Pending",
      to: "user-pending-list",
    },
    {
      counts: regData1.regionOne,
      message1: "Region-1",
      message2: "Registered Users",
      to: "user-r1-list",
    },
    {
      counts: regData1.regionTwo,
      message1: "Region-2",
      message2: "Registered Users",
      to: "user-r2-list",
    },
  ];

  // const registrationCards = [
  //   {
  //     counts: regData.length,
  //     message1: "Total",
  //     message2: "Request Recieved",
  //     to: "user-list",
  //   },
  //   {
  //     counts: regData.filter((elem) => elem.is_rejected === "Approved").length,
  //     message1: "Total",
  //     message2: "Request Accepted",
  //     to: "user-accepted-list",
  //   },
  //   {
  //     counts: regData.filter((elem) => elem.is_rejected === "Rejected").length,
  //     message1: "Total",
  //     message2: "Request Rejected",
  //     to: "user-rejected-list",
  //   },
  //   {
  //     counts: regData.filter((elem) => elem.is_rejected === "Pending").length,
  //     message1: "Total",
  //     message2: "Request Pending",
  //     to: "user-pending-list",
  //   },
  //   {
  //     counts: regData.filter(
  //       (elem) => elem.is_rejected === "Approved" && elem.region === "region-1"
  //     ).length,
  //     message1: "Region-1",
  //     message2: "Registered Users",
  //     to: "user-r1-list",
  //   },
  //   {
  //     counts: regData.filter(
  //       (elem) => elem.is_rejected === "Approved" && elem.region === "region-2"
  //     ).length,
  //     message1: "Region-2",
  //     message2: "Registered Users",
  //     to: "user-r2-list",
  //   },
  // ];

  const subcriptionCards = [
    {
      counts: subsData1.totalSubscribers,
      message1: "Total",
      message2: "Request Recieved",
      to: "subscription-list",
    },
    {
      counts: subsData1.totalAccepted,
      message1: "Total",
      message2: "Request Accepted",
      to: "subscription-accepted-list",
    },
    {
      counts: subsData1.rejected,
      message1: "Total",
      message2: "Request Rejected",
      to: "subscription-rejected-list",
    },
    {
      counts: subsData1.pending,
      message1: "Total",
      message2: "Request Pending",
      to: "subscription-pending-list",
    },
    {
      counts: subsData1.region1,
      message1: "Region-1",
      message2: "Request Accepted",
      to: "subscription-r1-list",
    },
    {
      counts: subsData1.region2,
      message1: "Region-2",
      message2: "Request Accepted",
      to: "subscription-r2-list",
    },
  ];

  const getAdmin = async () => {
    try {
      let response = await getAdminInfo({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      if (response.success) {
        setUsertype(response.data.data.usertype);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error in dashboard page !");
    }
  };

  // const admindetails = async () => {
  //   try {
  //     let response = await getAllAdmin({
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     });

  //     if (response.success) {
  //       setAdminData(response.data.data);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Error in admindashboard");
  //   }
  // };

  const registrationData = async () => {
    try {
      let response = await getAllRegion12GPA({
        Authorization: "Bearer " + localStorage.getItem("token"),
      });
      if (response.success) {
        setRegData1(response.data.allData);
        setRegData(response.data.industryTypeDetails)
        setsetCountGPA(response.data.GPAdata || [])
        setData(response.data.data)
        setSubsData1(response.data.subsAll)
        setAdminData1(response.data.adminAll)
        console.log(response.data.adminAll);

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error in admin dashboard page");
    }
  };

  // const registrationData = async () => {
  //   try {
  //     let response = await getAllUserData({
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     });
  //     if (response.success) {
  //       setRegData(response.data.data || []);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Error in admin dashboard page");
  //   }
  // };

  // const subscriptionData = async () => {
  //   try {
  //     let response = await AllSubsPaymentDetails({
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     });
  //     if (response.success) {
  //       setSubsData(response.data.data || []);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Error in admin dashboard");
  //   }
  // };

  //   const userDetailsTypeData = async () => {
  //     try {
  //       let response = await getUsageDetails();
  //       console.log(response);
  //       if (response.success) {
  //         setData(response.data.data)
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     } catch (error) {
  //       toast.error("Error in admin dashboard !");
  //     }
  //   };
  // console.log(data)
  useEffect(() => {
    // admindetails();
    // userDetailsTypeData();

    getAdmin();
    registrationData();
    // subscriptionData();
  }, []);

  return (
    <>
      {usertype === "superadmin" && (
        <Sidebar>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">Admin Details</h2>
            </div>
            <div className="row">
              <div className="">
                <div
                  className="card-contents"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "15px",
                    marginBottom: "30px",
                  }}
                >
                  {admindetailsData.map((elem, idx) => {
                    return (
                      <div
                        className="cards"
                        key={idx}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr style={{ width: "100%", margin: "10px 0" }} />
                        <Link to={elem.to}>
                          View &emsp;
                          <i className="fa-solid fa-circle-arrow-right"></i>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="section_heading">
              <h2 className="title_heading">Registration Details</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card-div">
                  {registrationCards.map((elem, idx) => {
                    return (
                      <div className="cards" key={idx}>
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr />
                        <Link to={`/admin/${elem.to}`}>
                          View &emsp;
                          <i className="fa-solid fa-circle-arrow-right"></i>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-6">
                <DataChartReg />
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">Subscription Details</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card-div">
                  {subcriptionCards.map((elem, idx) => {
                    return (
                      <div className="cards" key={idx}>
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr />
                        <Link to={`/admin/${elem.to}`}>
                          View &emsp;
                          <i className="fa-solid fa-circle-arrow-right"></i>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-6">
                <DataChart />
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">User Details by Type...</h2>
            </div>
            <div>
              <div className="table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        User Types
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 1 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 2 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {userDetailsType.length > 0 ? (
                      <>
                        {userDetailsType.map((elem, idx) => (
                          <tr key={idx}>
                            <td>{elem.userType}</td>
                            <td>{elem.region1}</td>
                            <td>{elem.region2}</td>
                            <td>{elem.region1 + elem.region2}</td>
                          </tr>
                        ))}

                        {/* Grand Total Row */}
                        <tr
                          style={{ backgroundColor: "#2c3e50", color: "#fff" }}
                        >
                          <td>
                            <strong>Grand Total</strong>
                          </td>
                          <td>
                            <strong>
                              {userDetailsType.reduce(
                                (sum, elem) => sum + elem.region1,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {userDetailsType.reduce(
                                (sum, elem) => sum + elem.region2,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {userDetailsType.reduce(
                                (sum, elem) => sum + elem.region1,
                                0
                              ) +
                                userDetailsType.reduce(
                                  (sum, elem) => sum + elem.region2,
                                  0
                                )}
                            </strong>
                          </td>
                        </tr>
                      </>
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
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">User Details by Industry...</h2>
            </div>
            <div>
              <div className=" table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Industry Types
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 1 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 2 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {regData.length > 0 ? (
                      <>
                        {regData.map((data, index) => (
                          <tr key={index}>
                            <td>{data.IndustryTypes}</td>
                            <td>{data.region1}</td>
                            <td>{data.region2}</td>
                            <td>{data.region1 + data.region2}</td>
                          </tr>
                        ))}
                        {/* Grand Total Row */}
                        <tr
                          style={{ backgroundColor: "#2c3e50", color: "#fff" }}
                        >
                          <td>
                            <strong>Grand Total</strong>
                          </td>
                          <td>
                            <strong>
                              {regData.reduce(
                                (sum, acc) => sum + acc.region1,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {regData.reduce(
                                (sum, acc) => sum + acc.region2,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {regData.reduce(
                                (sum, acc) => sum + acc.region1,
                                0
                              ) +
                                regData.reduce(
                                  (sum, acc) => sum + acc.region2,
                                  0
                                )}
                            </strong>
                          </td>
                        </tr>
                      </>
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
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">
                Usage Details by User Type (In Hours)...
              </h2>
            </div>
            <div>
              <div className=" table-div mb-4">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        User Types
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RTK Region 1
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RTK Region 2
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RTK Total
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RDS Region 1
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RDS Region 2
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RDS Total
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Grand Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      <>
                        {data.map((elem, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{elem.user_type}</td>
                              <td>{elem.rtk_region_1}</td>
                              <td>{elem.rtk_region_2}</td>
                              <td>{elem.rtk_region_1 + elem.rtk_region_2}</td>
                              <td>{elem.rds_region_1}</td>
                              <td>{elem.rds_region_2}</td>
                              <td>{elem.rds_region_1 + elem.rds_region_2}</td>
                              <td>{elem.rtk_region_1 + elem.rtk_region_2 + elem.rds_region_1 + elem.rds_region_2}</td>
                            </tr>
                          );
                        })}
                        <tr
                          style={{ backgroundColor: "#2c3e50", color: "#fff" }}
                        >
                          <td>
                            <strong>Grand Total</strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rtk_region_1,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rtk_region_2,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rtk_region_1,
                                0
                              ) +
                                data.reduce(
                                  (sum, elem) => sum + elem.rtk_region_2,
                                  0
                                )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rds_region_1,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rds_region_2,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rds_region_1,
                                0
                              ) +
                                data.reduce(
                                  (sum, elem) => sum + elem.rds_region_2,
                                  0
                                )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rtk_region_1,
                                0
                              ) +
                                data.reduce(
                                  (sum, elem) => sum + elem.rtk_region_2,
                                  0
                                ) + data.reduce(
                                  (sum, elem) => sum + elem.rds_region_1,
                                  0
                                ) + data.reduce(
                                  (sum, elem) => sum + elem.rds_region_2,
                                  0
                                )
                              }
                            </strong>
                          </td>
                        </tr>
                      </>
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
        </Sidebar>
      )}
      {usertype === "admin" && (
        <Sidebar>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">Registration Details</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card-div">
                  {registrationCards.map((elem, idx) => {
                    return (
                      <div className="cards" key={idx}>
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr />
                        <Link to={`/admin/${elem.to}`}>
                          View &emsp;
                          <i className="fa-solid fa-circle-arrow-right"></i>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-6">
                <DataChartReg />
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">Subscription Details</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card-div">
                  {subcriptionCards.map((elem, idx) => {
                    return (
                      <div className="cards" key={idx}>
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr />
                        <Link to={`/admin/${elem.to}`}>
                          View &emsp;
                          <i className="fa-solid fa-circle-arrow-right"></i>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-6">
                <DataChart />
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">User Details by Type...</h2>
            </div>
            <div>
              <div className=" table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        User Types
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 1 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 2 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Grand Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetailsType.length > 0 ? (
                      <>
                        {userDetailsType.map((elem, idx) => (
                          <tr key={idx}>
                            <td>{elem.userType}</td>
                            <td>{elem.region1}</td>
                            <td>{elem.region2}</td>
                            <td>{elem.region1 + elem.region2}</td>
                          </tr>
                        ))}

                        {/* Grand Total Row */}
                        <tr
                          style={{ backgroundColor: "#2c3e50", color: "#fff" }}
                        >
                          <td>
                            <strong>Grand Total</strong>
                          </td>
                          <td>
                            <strong>
                              {userDetailsType.reduce(
                                (sum, elem) => sum + elem.region1,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {userDetailsType.reduce(
                                (sum, elem) => sum + elem.region2,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {userDetailsType.reduce(
                                (sum, elem) => sum + elem.region1,
                                0
                              ) +
                                userDetailsType.reduce(
                                  (sum, elem) => sum + elem.region2,
                                  0
                                )}
                            </strong>
                          </td>
                        </tr>
                      </>
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
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">User Details by Industry...</h2>
            </div>
            <div>
              <div className=" table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Industry Types
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 1 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 2 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {regData.length > 0 ? (
                      <>
                        {regData.map((data, index) => (
                          <tr key={index}>
                            <td>{data.IndustryTypes}</td>
                            <td>{data.region1}</td>
                            <td>{data.region2}</td>
                            <td>{data.region1 + data.region2}</td>
                          </tr>
                        ))}
                        {/* Grand Total Row */}
                        <tr
                          style={{ backgroundColor: "#2c3e50", color: "#fff" }}
                        >
                          <td>
                            <strong>Grand Total</strong>
                          </td>
                          <td>
                            <strong>
                              {regData.reduce(
                                (sum, acc) => sum + acc.region1,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {regData.reduce(
                                (sum, acc) => sum + acc.region2,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {regData.reduce(
                                (sum, acc) => sum + acc.region1,
                                0
                              ) +
                                regData.reduce(
                                  (sum, acc) => sum + acc.region2,
                                  0
                                )}
                            </strong>
                          </td>
                        </tr>
                      </>
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
          <div className="clear">
            <div className="section_heading">
              <h2 className="title_heading">
                Usage Details by User Type (In Hours)...
              </h2>
            </div>
            <div>
              <div className=" table-div mb-4">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        User Types
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RTK Region 1
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RTK Region 2
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RTK Total
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RDS Region 1
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RDS Region 2
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RDS Total
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Grand Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      <>
                        {data.map((elem, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{elem.user_type}</td>
                              <td>{elem.rtk_region_1}</td>
                              <td>{elem.rtk_region_2}</td>
                              <td>{elem.rtk_region_1 + elem.rtk_region_2}</td>
                              <td>{elem.rds_region_1}</td>
                              <td>{elem.rds_region_2}</td>
                              <td>{elem.rds_region_1 + elem.rds_region_2}</td>
                              <td>{elem.rtk_region_1 + elem.rtk_region_2 + elem.rds_region_1 + elem.rds_region_2}</td>
                            </tr>
                          );
                        })}
                        <tr
                          style={{ backgroundColor: "#2c3e50", color: "#fff" }}
                        >
                          <td>
                            <strong>Grand Total</strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rtk_region_1,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rtk_region_2,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rtk_region_1,
                                0
                              ) +
                                data.reduce(
                                  (sum, elem) => sum + elem.rtk_region_2,
                                  0
                                )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rds_region_1,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rds_region_2,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rds_region_1,
                                0
                              ) +
                                data.reduce(
                                  (sum, elem) => sum + elem.rds_region_2,
                                  0
                                )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rtk_region_1,
                                0
                              ) +
                                data.reduce(
                                  (sum, elem) => sum + elem.rtk_region_2,
                                  0
                                ) + data.reduce(
                                  (sum, elem) => sum + elem.rds_region_1,
                                  0
                                ) + data.reduce(
                                  (sum, elem) => sum + elem.rds_region_2,
                                  0
                                )
                              }
                            </strong>
                          </td>
                        </tr>
                      </>
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
        </Sidebar>
      )}
      {usertype === "viewer" && (
        <div>
          <AdminHeader />
          <div className="clear" style={{ margin: "0px 60px " }}>
            <div className="section_heading">
              <h2 className="title_heading">Registration Details</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card-div">
                  {registrationCards.map((elem, idx) => {
                    return (
                      <div className="cards" key={idx}>
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-6">
                <DataChartReg />
              </div>
            </div>
          </div>
          <div className="clear" style={{ margin: "0px 60px" }}>
            <div className="section_heading">
              <h2 className="title_heading">Subscription Details</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card-div">
                  {subcriptionCards.map((elem, idx) => {
                    return (
                      <div className="cards" key={idx}>
                        <h2>{elem.counts}</h2>
                        <p>{elem.message1}</p>
                        <p>{elem.message2}</p>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-6">
                <DataChart />
              </div>
            </div>
          </div>
          <div className="clear" style={{ margin: "0px 60px" }}>
            <div className="section_heading">
              <h2 className="title_heading">User Details by Type...</h2>
            </div>
            <div>
              <div className=" table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        User Types
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 1 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 2 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetailsType.length > 0 ? (
                      <>
                        {userDetailsType.map((elem, idx) => (
                          <tr key={idx}>
                            <td>{elem.userType}</td>
                            <td>{elem.region1}</td>
                            <td>{elem.region2}</td>
                            <td>{elem.region1 + elem.region2}</td>
                          </tr>
                        ))}

                        {/* Grand Total Row */}
                        <tr
                          style={{ backgroundColor: "#2c3e50", color: "#fff" }}
                        >
                          <td>
                            <strong>Grand Total</strong>
                          </td>
                          <td>
                            <strong>
                              {userDetailsType.reduce(
                                (sum, elem) => sum + elem.region1,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {userDetailsType.reduce(
                                (sum, elem) => sum + elem.region2,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {userDetailsType.reduce(
                                (sum, elem) => sum + elem.region1,
                                0
                              ) +
                                userDetailsType.reduce(
                                  (sum, elem) => sum + elem.region2,
                                  0
                                )}
                            </strong>
                          </td>
                        </tr>
                      </>
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
          <div className="clear" style={{ margin: "0px 60px" }}>
            <div className="section_heading">
              <h2 className="title_heading">User Details by Industry...</h2>
            </div>
            <div>
              <div className=" table-div">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Industry Types
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 1 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Region 2 Users
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {regData.length > 0 ? (
                      <>
                        {regData.map((data, index) => (
                          <tr key={index}>
                            <td>{data.IndustryTypes}</td>
                            <td>{data.region1}</td>
                            <td>{data.region2}</td>
                            <td>{data.region1 + data.region2}</td>
                          </tr>
                        ))}
                        {/* Grand Total Row */}
                        <tr
                          style={{ backgroundColor: "#2c3e50", color: "#fff" }}
                        >
                          <td>
                            <strong>Grand Total</strong>
                          </td>
                          <td>
                            <strong>
                              {regData.reduce(
                                (sum, acc) => sum + acc.region1,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {regData.reduce(
                                (sum, acc) => sum + acc.region2,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {regData.reduce(
                                (sum, acc) => sum + acc.region1,
                                0
                              ) +
                                regData.reduce(
                                  (sum, acc) => sum + acc.region2,
                                  0
                                )}
                            </strong>
                          </td>
                        </tr>
                      </>
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
          <div className="clear" style={{ margin: "0px 60px" }}>
            <div className="section_heading">
              <h2 className="title_heading">
                Usage Details by User Type (In Hours)...
              </h2>
            </div>
            <div>
              <div className=" table-div mb-4">
                <table
                  className="content-table"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        User Types
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RTK Region 1
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RTK Region 2
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RTK Total
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RDS Region 1
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RDS Region 2
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        RDS Total
                      </th>
                      <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                        Grand Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      <>
                        {data.map((elem, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{elem.user_type}</td>
                              <td>{elem.rtk_region_1}</td>
                              <td>{elem.rtk_region_2}</td>
                              <td>{elem.rtk_region_1 + elem.rtk_region_2}</td>
                              <td>{elem.rds_region_1}</td>
                              <td>{elem.rds_region_2}</td>
                              <td>{elem.rds_region_1 + elem.rds_region_2}</td>
                              <td>{elem.rtk_region_1 + elem.rtk_region_2 + elem.rds_region_1 + elem.rds_region_2}</td>
                            </tr>
                          );
                        })}
                        <tr
                          style={{ backgroundColor: "#2c3e50", color: "#fff" }}
                        >
                          <td>
                            <strong>Grand Total</strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rtk_region_1,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rtk_region_2,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rtk_region_1,
                                0
                              ) +
                                data.reduce(
                                  (sum, elem) => sum + elem.rtk_region_2,
                                  0
                                )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rds_region_1,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rds_region_2,
                                0
                              )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rds_region_1,
                                0
                              ) +
                                data.reduce(
                                  (sum, elem) => sum + elem.rds_region_2,
                                  0
                                )}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {data.reduce(
                                (sum, elem) => sum + elem.rtk_region_1,
                                0
                              ) +
                                data.reduce(
                                  (sum, elem) => sum + elem.rtk_region_2,
                                  0
                                ) + data.reduce(
                                  (sum, elem) => sum + elem.rds_region_1,
                                  0
                                ) + data.reduce(
                                  (sum, elem) => sum + elem.rds_region_2,
                                  0
                                )
                              }
                            </strong>
                          </td>
                        </tr>
                      </>
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
      )}
    </>
  );
};

export default AdminDashboard;











// import React, { useEffect, useState } from "react";
// import Sidebar from "./layout/Sidebar";
// import { Link, useNavigate } from "react-router-dom";
// import "./styles/dashboard.css";
// import AdminHeader from "./layout/AdminHeader";
// import DataChart from "./DataChart";
// import toast from "react-hot-toast";
// import {
//   getAllAdmin,
//   getAllUserData,
//   getAdminInfo,
//   AllSubsPaymentDetails,
//   getUsageDetails,
// } from "../services/Apis";

// const AdminDashboard = () => {
//   const [usertype, setUsertype] = useState("");
//   const [data, setData] = useState([]);
//   const [adminData, setAdminData] = useState([]);
//   const [regData, setRegData] = useState([]);
//   const [subsData, setSubsData] = useState([]);

//   const userDetailsType = [
//     {
//       userType: "Government Users",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.usertype === "Govt User"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.usertype === "Govt User"
//         ).length || 0,
//     },
//     {
//       userType: "Private Users",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.usertype === "Private User"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.usertype === "Private User"
//         ).length || 0,
//     },
//     {
//       userType: "Academic Users",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.usertype === "Research/Academic User"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.usertype === "Research/Academic User"
//         ).length || 0,
//     },
//   ];

//   const industryTypeDetails = [
//     {
//       IndustryTypes: "Agriculture",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "agriculture"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "agriculture"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Aviation",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "aviation"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "aviation"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Climatology And Earth Sciences",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "climatology and earth sciences"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "climatology and earth sciences"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Communication And Navigation",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "communication and navigation"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "communication and navigation"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Defence And Paramilitary",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "defence and paramilitary"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "defence and paramilitary"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Disaster Management",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "disaster management"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "disaster management"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Drone Based Services",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "drone based services"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "drone based services"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Engineering And Construction",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "engineering and construction"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "engineering and construction"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Fisheries And Maritime Activities",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "fisheries and maritime activities"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "fisheries and maritime activities"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Forest And Environment",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "forest and environment"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "forest and environment"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Geological And Geotechnical",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "geological and geotechnical"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "geological and geotechnical"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Geospatial Development",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "geospatial development"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "geospatial development"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Information Unavailable",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "information unavailable"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "information unavailable"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Land Survey And Mapping",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "land survey and mapping"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "land survey and mapping"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Logistics",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "logistics"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "logistics"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Mining Industries",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "mining industries"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "mining industries"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Other",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "other"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "other"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Petroleum And Natural Gas Industries",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() ===
//               "petroleum and natural gas industries"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() ===
//               "petroleum and natural gas industries"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Remote Sensing Applications",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "remote sensing applications"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "remote sensing applications"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Research & Development",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "research & development"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "research & development"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Telecommunication",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "telecommunication"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "telecommunication"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Transportation",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "transportation"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "transportation"
//         ).length || 0,
//     },
//     {
//       IndustryTypes: "Urban And Rural Development",
//       region1:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-1" &&
//             elem.category.toLowerCase() === "urban and rural development"
//         ).length || 0,
//       region2:
//         regData.filter(
//           (elem) =>
//             elem.is_rejected === "Approved" &&
//             elem.region === "region-2" &&
//             elem.category.toLowerCase() === "urban and rural development"
//         ).length || 0,
//     },
//   ];

//   const admindetailsData = [
//     {
//       counts: adminData.length,
//       message1: "Total",
//       message2: "Admins",
//       to: "all-admins",
//     },
//     {
//       counts: adminData.filter((elem) => elem.status === "Active").length,
//       message1: "Total",
//       message2: "Active Admins",
//       to: "active-admins",
//     },
//     {
//       counts: adminData.filter((elem) => elem.status === "Blocked").length,
//       message1: "Total",
//       message2: "Blocked Admins",
//       to: "admin-blocked",
//     },
//     {
//       counts: adminData.filter((elem) => elem.status === "Pending").length,
//       message1: "Total",
//       message2: "Pending Request",
//       to: "admin-request",
//     },
//   ];

//   const registrationCards = [
//     {
//       counts: regData.length,
//       message1: "Total",
//       message2: "Request Recieved",
//       to: "user-list",
//     },
//     {
//       counts: regData.filter((elem) => elem.is_rejected === "Approved").length,
//       message1: "Total",
//       message2: "Request Accepted",
//       to: "user-accepted-list",
//     },
//     {
//       counts: regData.filter((elem) => elem.is_rejected === "Rejected").length,
//       message1: "Total",
//       message2: "Request Rejected",
//       to: "user-rejected-list",
//     },
//     {
//       counts: regData.filter((elem) => elem.is_rejected === "Pending").length,
//       message1: "Total",
//       message2: "Request Pending",
//       to: "user-pending-list",
//     },
//     {
//       counts: regData.filter(
//         (elem) => elem.is_rejected === "Approved" && elem.region === "region-1"
//       ).length,
//       message1: "Region-1",
//       message2: "Registered Users",
//       to: "user-r1-list",
//     },
//     {
//       counts: regData.filter(
//         (elem) => elem.is_rejected === "Approved" && elem.region === "region-2"
//       ).length,
//       message1: "Region-2",
//       message2: "Registered Users",
//       to: "user-r2-list",
//     },
//   ];

//   const subcriptionCards = [
//     {
//       counts: subsData.length,
//       message1: "Total",
//       message2: "Request Recieved",
//       to: "subscription-list",
//     },
//     {
//       counts: subsData.filter((elem) => elem.status === "Approved").length,
//       message1: "Total",
//       message2: "Request Accepted",
//       to: "subscription-accepted-list",
//     },
//     {
//       counts: subsData.filter((elem) => elem.status === "Rejected").length,
//       message1: "Total",
//       message2: "Request Rejected",
//       to: "subscription-rejected-list",
//     },
//     {
//       counts: subsData.filter((elem) => elem.status === "Pending").length,
//       message1: "Total",
//       message2: "Request Pending",
//       to: "subscription-pending-list",
//     },
//     {
//       counts: subsData.filter(
//         (elem) => elem.region_name === "region-1" && elem.status === "Approved"
//       ).length,
//       message1: "Region-1",
//       message2: "Request Accepted",
//       to: "subscription-r1-list",
//     },
//     {
//       counts: subsData.filter(
//         (elem) => elem.region_name === "region-2" && elem.status === "Approved"
//       ).length,
//       message1: "Region-2",
//       message2: "Request Accepted",
//       to: "subscription-r2-list",
//     },
//   ];

//   const getAdmin = async () => {
//     try {
//       let response = await getAdminInfo({
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       });
//       if (response.success) {
//         setUsertype(response.data.data.usertype);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Error in dashboard page !");
//     }
//   };

//   const admindetails = async () => {
//     try {
//       let response = await getAllAdmin({
//         Authorization: "Bearer " + localStorage.getItem("token"),
//       });

//       if (response.success) {
//         setAdminData(response.data.data);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Error in admindashboard");
//     }
//   };

//   const registrationData = async () => {
//     try {
//       let response = await getAllUserData({
//         Authorization: "Bearer " + localStorage.getItem("token"),
//       });
//       if (response.success) {
//         setRegData(response.data.data || []);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Error in admin dashboard page");
//     }
//   };

//   const subscriptionData = async () => {
//     try {
//       let response = await AllSubsPaymentDetails({
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       });
//       if (response.success) {
//         setSubsData(response.data.data || []);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Error in admin dashboard");
//     }
//   };

//   const userDetailsTypeData = async () => {
//     try {
//       let response = await getUsageDetails();
//       if (response.success) {
//         setData(response.data.data);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Error in admin dashboard !");
//     }
//   };

//   // Start Chart functions
//   function formatMonth(dateString) {
//     return dateString.slice(0, 7);
//   }

//   // Function to count per month
//   function countPerMonth(data) {
//     return data.reduce((acc, reg) => {
//       const month = formatMonth(reg.date_created);
//       if (!acc[month]) {
//         acc[month] = 0;
//       }
//       acc[month] += 1;
//       return acc;
//     }, {});
//   }

//   // Get the count of registrations per month
//   const monthlyRegCount = countPerMonth(
//     regData.filter((elem) => elem.is_rejected === "Approved")
//   );
//   // Get the count of subscription per month
//   const monthSubsCount = countPerMonth(
//     subsData.filter((elem) => elem.status === "Approved")
//   );

//   // End chart functions

//   useEffect(() => {
//     admindetails();
//     userDetailsTypeData();
//     getAdmin();
//     registrationData();
//     subscriptionData();
//   }, []);

//   return (
//     <>
//       {usertype === "superadmin" && (
//         <Sidebar>
//           <div className="clear">
//             <div className="section_heading">
//               <h2 className="title_heading">Admin Details</h2>
//             </div>
//             <div className="row">
//               <div className="">
//                 <div
//                   className="card-contents"
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     gap: "15px",
//                     marginBottom: "30px",
//                   }}
//                 >
//                   {admindetailsData.map((elem, idx) => {
//                     return (
//                       <div
//                         className="cards"
//                         key={idx}
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <h2>{elem.counts}</h2>
//                         <p>{elem.message1}</p>
//                         <p>{elem.message2}</p>
//                         <hr style={{ width: "100%", margin: "10px 0" }} />
//                         <Link to={elem.to}>
//                           View &emsp;
//                           <i className="fa-solid fa-circle-arrow-right"></i>
//                         </Link>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//             <div className="section_heading">
//               <h2 className="title_heading">Registration Details</h2>
//             </div>
//             <div className="row">
//               <div className="col-12 col-lg-6 col-xl-6">
//                 <div className="card-div">
//                   {registrationCards.map((elem, idx) => {
//                     return (
//                       <div className="cards" key={idx}>
//                         <h2>{elem.counts}</h2>
//                         <p>{elem.message1}</p>
//                         <p>{elem.message2}</p>
//                         <hr />
//                         <Link to={`/admin/${elem.to}`}>
//                           View &emsp;
//                           <i className="fa-solid fa-circle-arrow-right"></i>
//                         </Link>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//               <div className="col-12 col-lg-6 col-xl-6">
//                 <h4 style={{ textAlign: "center", fontStyle: "italic" }}>
//                   User Registration Trend
//                 </h4>
//                 <DataChart dataVal={monthlyRegCount} />
//               </div>
//             </div>
//           </div>
//           <div className="clear">
//             <div className="section_heading">
//               <h2 className="title_heading">Subscription Details</h2>
//             </div>
//             <div className="row">
//               <div className="col-12 col-lg-6 col-xl-6">
//                 <div className="card-div">
//                   {subcriptionCards.map((elem, idx) => {
//                     return (
//                       <div className="cards" key={idx}>
//                         <h2>{elem.counts}</h2>
//                         <p>{elem.message1}</p>
//                         <p>{elem.message2}</p>
//                         <hr />
//                         <Link to={`/admin/${elem.to}`}>
//                           View &emsp;
//                           <i className="fa-solid fa-circle-arrow-right"></i>
//                         </Link>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//               <div className="col-12 col-lg-6 col-xl-6">
//                 <h4 style={{ textAlign: "center", fontStyle: "italic" }}>
//                   Subscription Trend
//                 </h4>
//                 <DataChart dataVal={monthSubsCount} />
//               </div>
//             </div>
//           </div>
//           <div className="clear">
//             <div className="section_heading">
//               <h2 className="title_heading">User Details by Type...</h2>
//             </div>
//             <div>
//               <div className="table-div">
//                 <table
//                   className="content-table"
//                   style={{ textAlign: "center", width: "100%" }}
//                 >
//                   <thead>
//                     <tr>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         User Types
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Region 1 Users
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Region 2 Users
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Total
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {userDetailsType.length > 0 ? (
//                       <>
//                         {userDetailsType.map((elem, idx) => (
//                           <tr key={idx}>
//                             <td>{elem.userType}</td>
//                             <td>{elem.region1}</td>
//                             <td>{elem.region2}</td>
//                             <td>{elem.region1 + elem.region2}</td>
//                           </tr>
//                         ))}

//                         {/* Grand Total Row */}
//                         <tr
//                           style={{ backgroundColor: "#2c3e50", color: "#fff" }}
//                         >
//                           <th>
//                             <strong>Grand Total</strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region1,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region2,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region1,
//                                 0
//                               ) +
//                                 userDetailsType.reduce(
//                                   (sum, elem) => sum + elem.region2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                         </tr>
//                       </>
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center">
//                           No data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="clear">
//             <div className="section_heading">
//               <h2 className="title_heading">User Details by Industry...</h2>
//             </div>
//             <div>
//               <div className=" table-div">
//                 <table
//                   className="content-table"
//                   style={{ textAlign: "center", width: "100%" }}
//                 >
//                   <thead>
//                     <tr>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Industry Types
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Region 1 Users
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Region 2 Users
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Total
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {industryTypeDetails.length > 0 ? (
//                       <>
//                         {industryTypeDetails.map((elem, idx) => (
//                           <tr key={idx}>
//                             <td>{elem.IndustryTypes}</td>
//                             <td>{elem.region1}</td>
//                             <td>{elem.region2}</td>
//                             <td>{elem.region1 + elem.region2}</td>
//                           </tr>
//                         ))}
//                         {/* Grand Total Row */}
//                         <tr
//                           style={{ backgroundColor: "#2c3e50", color: "#fff" }}
//                         >
//                           <th>
//                             <strong>Grand Total</strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region1,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region2,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region1,
//                                 0
//                               ) +
//                                 userDetailsType.reduce(
//                                   (sum, elem) => sum + elem.region2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                         </tr>
//                       </>
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center">
//                           No data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="clear">
//             <div className="section_heading">
//               <h2 className="title_heading">
//                 Usage Details by User Type (In Hours)...
//               </h2>
//             </div>
//             <div>
//               <div className=" table-div mb-4">
//                 <table
//                   className="content-table"
//                   style={{ textAlign: "center", width: "100%" }}
//                 >
//                   <thead>
//                     <tr>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         User Types
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RTK Region 1
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RTK Region 2
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RTK Total
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RDS Region 1
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RDS Region 2
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RDS Total
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Grand Total
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.length > 0 ? (
//                       <>
//                         {data.map((elem, idx) => {
//                           return (
//                             <tr key={idx}>
//                               <td>{elem.user_type}</td>
//                               <td>{elem.rtk_region_1}</td>
//                               <td>{elem.rtk_region_2}</td>
//                               <td>{elem.rtk_region_1 + elem.rtk_region_2}</td>
//                               <td>{elem.rds_region_1}</td>
//                               <td>{elem.rds_region_2}</td>
//                               <td>{elem.rds_region_1 + elem.rds_region_2}</td>
//                               <td>
//                                 {elem.rtk_region_1 +
//                                   elem.rtk_region_2 +
//                                   elem.rds_region_1 +
//                                   elem.rds_region_2}
//                               </td>
//                             </tr>
//                           );
//                         })}
//                         <tr
//                           style={{ backgroundColor: "#2c3e50", color: "#fff" }}
//                         >
//                           <th>
//                             <strong>Grand Total</strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rtk_region_1,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rtk_region_2,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rtk_region_1,
//                                 0
//                               ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rtk_region_2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rds_region_1,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rds_region_2,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rds_region_1,
//                                 0
//                               ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rds_region_2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rtk_region_1,
//                                 0
//                               ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rtk_region_2,
//                                   0
//                                 ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rds_region_1,
//                                   0
//                                 ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rds_region_2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                         </tr>
//                       </>
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center">
//                           No data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//                 <h6 className="mt-2 mb-2 text-primary fst-italic">Usage details as shown above are from 06-2022 to 10-2024</h6>
//               </div>
//             </div>
//           </div>
//         </Sidebar>
//       )}
//       {usertype === "admin" && (
//         <Sidebar>
//           <div className="clear">
//             <div className="section_heading">
//               <h2 className="title_heading">Registration Details</h2>
//             </div>
//             <div className="row">
//               <div className="col-12 col-lg-6 col-xl-6">
//                 <div className="card-div">
//                   {registrationCards.map((elem, idx) => {
//                     return (
//                       <div className="cards" key={idx}>
//                         <h2>{elem.counts}</h2>
//                         <p>{elem.message1}</p>
//                         <p>{elem.message2}</p>
//                         <hr />
//                         <Link to={`/admin/${elem.to}`}>
//                           View &emsp;
//                           <i className="fa-solid fa-circle-arrow-right"></i>
//                         </Link>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//               <div className="col-12 col-lg-6 col-xl-6">
//                 <h4 style={{ textAlign: "center", fontStyle: "italic" }}>
//                   User Registration Trend
//                 </h4>
//                 <DataChart dataVal={monthlyRegCount} />
//               </div>
//             </div>
//           </div>
//           <div className="clear">
//             <div className="section_heading">
//               <h2 className="title_heading">Subscription Details</h2>
//             </div>
//             <div className="row">
//               <div className="col-12 col-lg-6 col-xl-6">
//                 <div className="card-div">
//                   {subcriptionCards.map((elem, idx) => {
//                     return (
//                       <div className="cards" key={idx}>
//                         <h2>{elem.counts}</h2>
//                         <p>{elem.message1}</p>
//                         <p>{elem.message2}</p>
//                         <hr />
//                         <Link to={`/admin/${elem.to}`}>
//                           View &emsp;
//                           <i className="fa-solid fa-circle-arrow-right"></i>
//                         </Link>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//               <div className="col-12 col-lg-6 col-xl-6">
//                 <h4 style={{ textAlign: "center", fontStyle: "italic" }}>
//                   Subscription Trend
//                 </h4>
//                 <DataChart dataVal={monthSubsCount} />
//               </div>
//             </div>
//           </div>
//           <div className="clear">
//             <div className="section_heading">
//               <h2 className="title_heading">User Details by Type...</h2>
//             </div>
//             <div>
//               <div className=" table-div">
//                 <table
//                   className="content-table"
//                   style={{ textAlign: "center", width: "100%" }}
//                 >
//                   <thead>
//                     <tr>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         User Types
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Region 1 Users
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Region 2 Users
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Grand Total
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {userDetailsType.length > 0 ? (
//                       <>
//                         {userDetailsType.map((elem, idx) => (
//                           <tr key={idx}>
//                             <td>{elem.userType}</td>
//                             <td>{elem.region1}</td>
//                             <td>{elem.region2}</td>
//                             <td>{elem.region1 + elem.region2}</td>
//                           </tr>
//                         ))}

//                         {/* Grand Total Row */}
//                         <tr
//                           style={{ backgroundColor: "#2c3e50", color: "#fff " }}
//                         >
//                           <th>
//                             <strong>Grand Total</strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region1,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region2,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region1,
//                                 0
//                               ) +
//                                 userDetailsType.reduce(
//                                   (sum, elem) => sum + elem.region2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                         </tr>
//                       </>
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center">
//                           No data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="clear">
//             <div className="section_heading">
//               <h2 className="title_heading">User Details by Industry...</h2>
//             </div>
//             <div>
//               <div className=" table-div">
//                 <table
//                   className="content-table"
//                   style={{ textAlign: "center", width: "100%" }}
//                 >
//                   <thead>
//                     <tr>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Industry Types
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Region 1 Users
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Region 2 Users
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Total
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {industryTypeDetails.length > 0 ? (
//                       <>
//                         {industryTypeDetails.map((elem, idx) => (
//                           <tr key={idx}>
//                             <td>{elem.IndustryTypes}</td>
//                             <td>{elem.region1}</td>
//                             <td>{elem.region2}</td>
//                             <td>{elem.region1 + elem.region2}</td>
//                           </tr>
//                         ))}
//                         {/* Grand Total Row */}
//                         <tr
//                           style={{ backgroundColor: "#2c3e50", color: "#fff" }}
//                         >
//                           <th>
//                             <strong>Grand Total</strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region1,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region2,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region1,
//                                 0
//                               ) +
//                                 userDetailsType.reduce(
//                                   (sum, elem) => sum + elem.region2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                         </tr>
//                       </>
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center">
//                           No data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="clear">
//             <div className="section_heading">
//               <h2 className="title_heading">
//                 Usage Details by User Type (In Hours)...
//               </h2>
//             </div>
//             <div className="mb-2">
//               <div className=" table-div mb-4">
//                 <table
//                   className="content-table"
//                   style={{ textAlign: "center", width: "100%" }}
//                 >
//                   <thead>
//                     <tr>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         User Types
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RTK Region 1
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RTK Region 2
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RTK Total
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RDS Region 1
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RDS Region 2
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RDS Total
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Grand Total
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.length > 0 ? (
//                       <>
//                         {data.map((elem, idx) => {
//                           return (
//                             <tr key={idx}>
//                               <td>{elem.user_type}</td>
//                               <td>{elem.rtk_region_1}</td>
//                               <td>{elem.rtk_region_2}</td>
//                               <td>{elem.rtk_region_1 + elem.rtk_region_2}</td>
//                               <td>{elem.rds_region_1}</td>
//                               <td>{elem.rds_region_2}</td>
//                               <td>{elem.rds_region_1 + elem.rds_region_2}</td>
//                               <td>
//                                 {elem.rtk_region_1 +
//                                   elem.rtk_region_2 +
//                                   elem.rds_region_1 +
//                                   elem.rds_region_2}
//                               </td>
//                             </tr>
//                           );
//                         })}
//                         <tr
//                           style={{ backgroundColor: "#2c3e50", color: "#fff" }}
//                         >
//                           <th>
//                             <strong>Grand Total</strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rtk_region_1,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rtk_region_2,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rtk_region_1,
//                                 0
//                               ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rtk_region_2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rds_region_1,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rds_region_2,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rds_region_1,
//                                 0
//                               ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rds_region_2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rtk_region_1,
//                                 0
//                               ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rtk_region_2,
//                                   0
//                                 ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rds_region_1,
//                                   0
//                                 ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rds_region_2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                         </tr>
//                       </>
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center">
//                           No data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//                 <h6 className="mt-2 mb-2 text-primary fst-italic">Usage details as shown above are from 06-2022 to 10-2024</h6>
//               </div>
//             </div>
//           </div>
//         </Sidebar>
//       )}
//       {usertype === "viewer" && (
//         <div>
//           <AdminHeader />
//           <div className="clear" style={{ margin: "0px 60px " }}>
//             <div className="section_heading">
//               <h2 className="title_heading">Registration Details</h2>
//             </div>
//             <div className="row">
//               <div className="col-12 col-lg-6 col-xl-6">
//                 <div className="card-div">
//                   {registrationCards.map((elem, idx) => {
//                     return (
//                       <div className="cards" key={idx}>
//                         <h2>{elem.counts}</h2>
//                         <p>{elem.message1}</p>
//                         <p>{elem.message2}</p>
//                         <hr />
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//               <div className="col-12 col-lg-6 col-xl-6">
//                 <h4 style={{ textAlign: "center", fontStyle: "italic" }}>
//                   User Registration Trend
//                 </h4>
//                 <DataChart dataVal={monthlyRegCount} />
//               </div>
//             </div>
//           </div>
//           <div className="clear" style={{ margin: "0px 60px" }}>
//             <div className="section_heading">
//               <h2 className="title_heading">Subscription Details</h2>
//             </div>
//             <div className="row">
//               <div className="col-12 col-lg-6 col-xl-6">
//                 <div className="card-div">
//                   {subcriptionCards.map((elem, idx) => {
//                     return (
//                       <div className="cards" key={idx}>
//                         <h2>{elem.counts}</h2>
//                         <p>{elem.message1}</p>
//                         <p>{elem.message2}</p>
//                         <hr />
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//               <div className="col-12 col-lg-6 col-xl-6">
//                 <h4 style={{ textAlign: "center", fontStyle: "italic" }}>
//                   Subscription Trend
//                 </h4>
//                 <DataChart dataVal={monthSubsCount} />
//               </div>
//             </div>
//           </div>
//           <div className="clear" style={{ margin: "0px 60px" }}>
//             <div className="section_heading">
//               <h2 className="title_heading">User Details by Type...</h2>
//             </div>
//             <div>
//               <div className=" table-div">
//                 <table
//                   className="content-table"
//                   style={{ textAlign: "center", width: "100%" }}
//                 >
//                   <thead>
//                     <tr>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         User Types
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Region 1 Users
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Region 2 Users
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Total
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {userDetailsType.length > 0 ? (
//                       <>
//                         {userDetailsType.map((elem, idx) => (
//                           <tr key={idx}>
//                             <td>{elem.userType}</td>
//                             <td>{elem.region1}</td>
//                             <td>{elem.region2}</td>
//                             <td>{elem.region1 + elem.region2}</td>
//                           </tr>
//                         ))}

//                         {/* Grand Total Row */}
//                         <tr
//                           style={{ backgroundColor: "#2c3e50", color: "#fff" }}
//                         >
//                           <th>
//                             <strong>Grand Total</strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region1,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region2,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region1,
//                                 0
//                               ) +
//                                 userDetailsType.reduce(
//                                   (sum, elem) => sum + elem.region2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                         </tr>
//                       </>
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center">
//                           No data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="clear" style={{ margin: "0px 60px" }}>
//             <div className="section_heading">
//               <h2 className="title_heading">User Details by Industry...</h2>
//             </div>
//             <div>
//               <div className=" table-div">
//                 <table
//                   className="content-table"
//                   style={{ textAlign: "center", width: "100%" }}
//                 >
//                   <thead>
//                     <tr>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Industry Types
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Region 1 Users
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Region 2 Users
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Total
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {industryTypeDetails.length > 0 ? (
//                       <>
//                         {industryTypeDetails.map((elem, idx) => (
//                           <tr key={idx}>
//                             <td>{elem.IndustryTypes}</td>
//                             <td>{elem.region1}</td>
//                             <td>{elem.region2}</td>
//                             <td>{elem.region1 + elem.region2}</td>
//                           </tr>
//                         ))}
//                         {/* Grand Total Row */}
//                         <tr
//                           style={{ backgroundColor: "#2c3e50", color: "#fff" }}
//                         >
//                           <th>
//                             <strong>Grand Total</strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region1,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region2,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {userDetailsType.reduce(
//                                 (sum, elem) => sum + elem.region1,
//                                 0
//                               ) +
//                                 userDetailsType.reduce(
//                                   (sum, elem) => sum + elem.region2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                         </tr>
//                       </>
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center">
//                           No data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="clear" style={{ margin: "0px 60px" }}>
//             <div className="section_heading">
//               <h2 className="title_heading">
//                 Usage Details by User Type (In Hours)...
//               </h2>
//             </div>
//             <div>
//               <div className=" table-div mb-4">
//                 <table
//                   className="content-table"
//                   style={{ textAlign: "center", width: "100%" }}
//                 >
//                   <thead>
//                     <tr>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         User Types
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RTK Region 1
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RTK Region 2
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RTK Total
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RDS Region 1
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RDS Region 2
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         RDS Total
//                       </th>
//                       <th style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                         Grand Total
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.length > 0 ? (
//                       <>
//                         {data.map((elem, idx) => {
//                           return (
//                             <tr key={idx}>
//                               <td>{elem.user_type}</td>
//                               <td>{elem.rtk_region_1}</td>
//                               <td>{elem.rtk_region_2}</td>
//                               <td>{elem.rtk_region_1 + elem.rtk_region_2}</td>
//                               <td>{elem.rds_region_1}</td>
//                               <td>{elem.rds_region_2}</td>
//                               <td>{elem.rds_region_1 + elem.rds_region_2}</td>
//                               <td>
//                                 {elem.rtk_region_1 +
//                                   elem.rtk_region_2 +
//                                   elem.rds_region_1 +
//                                   elem.rds_region_2}
//                               </td>
//                             </tr>
//                           );
//                         })}
//                         <tr
//                           style={{ backgroundColor: "#2c3e50", color: "#fff" }}
//                         >
//                           <th>
//                             <strong>Grand Total</strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rtk_region_1,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rtk_region_2,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rtk_region_1,
//                                 0
//                               ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rtk_region_2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rds_region_1,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rds_region_2,
//                                 0
//                               )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rds_region_1,
//                                 0
//                               ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rds_region_2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                           <th>
//                             <strong>
//                               {data.reduce(
//                                 (sum, elem) => sum + elem.rtk_region_1,
//                                 0
//                               ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rtk_region_2,
//                                   0
//                                 ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rds_region_1,
//                                   0
//                                 ) +
//                                 data.reduce(
//                                   (sum, elem) => sum + elem.rds_region_2,
//                                   0
//                                 )}
//                             </strong>
//                           </th>
//                         </tr>
//                       </>
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center">
//                           No data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//                 <h6 className="mt-2 mb-2 text-primary fst-italic">Usage details as shown above are from 06-2022 to 10-2024</h6>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdminDashboard;
