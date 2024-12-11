import { useEffect, useState } from "react";
import HeaderLayout from "../components/HeaderLayout";
import "./general-info.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getAllSubsData } from "../services/Apis";

const CorsServices = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getAllSubsData();
      if (response.data.success) {
        setData(response.data.data);
      } 
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rtkPlans = data.filter((item) => item.cors_plan.startsWith("RTK"));
  const rdsPlans = data.filter((item) => item.cors_plan.startsWith("RDS"));
  const dgnssPlans = data.filter((item) => item.cors_plan.startsWith("DGNSS"));
  const opsPlans = data.filter((item) => item.cors_plan.startsWith("OPS"));

  return (
    <HeaderLayout>
      <div className="container clear">
        <div className="section_heading">
          <h2 className="title_heading">
            Services offered by SOI CORS Network
          </h2>
        </div>
        <div className="row row-content">
          <h4 className="content-heading">1. Real Time Positioning Services</h4>
          <div className="col-md-12 col-lg-8 text-content">
            <h5 className="content-heading">
              a. Network RTK Services (NRTK):{" "}
            </h5>
            <p>
              &#11162; &nbsp; This service is used to achieve the location of a
              point in real-time with a relative positioning accuracy of 3-4 cm
              when following a set of best practices.{" "}
            </p>
            <p>
              &#11162; &nbsp; To avail these services users need to have an
              RTK-enabled GNSS Rover and Internet connectivity at the site
              location.
            </p>
            <p>
              &#11162; &nbsp; The users need to register themselves first on the
              CORS web portal using{" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/registration"
                target="_blank"
              >
                https://cors.surveyofindia.gov.in/registration{" "}
              </Link>
              and the SOP for registration can be found {" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/policies/registration_sop.pdf"
                target="_blank"
              >
                here.. <i className="fa-solid fa-square-up-right"></i>
              </Link>
            </p>
            <p>
              &#11162; &nbsp; After successful registration users need to
              purchase the subscription in order to avail the RTK services.
              Subscriptions are available free of charge basis to Central Govt.
              users, State Govt. users, and Govt. academic institutions. For
              rest of the categories i.e. PSU and Private users, they are
              required to purchase the subscription using{" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/subscription"
                target="_blank"
              >
                https://cors.surveyofindia.gov.in/subscription
              </Link>{" "}
              and the SOP for purchase of subscription can be found {" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/policies/subscription_sop.pdf."
                target="_blank"
              >
                here.. <i className="fa-solid fa-square-up-right"></i>
              </Link>
            </p>
          </div>
          <div className="col-md-12 col-lg-4">
            <h6 className="s_img_header">
              Refer below image to know the RTK operational areas:
            </h6>
            <div className="s_imgBox">
              <center>
                <img className="s_img" src="/images/RTPS.jpg" alt="RTPS" />
              </center>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <h5 className="s_img_header">
              The following are the details of the RTK Subscription charges:
            </h5>
            <div className="table-div">
              <table className="content-table ">
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Plan</th>
                    <th style={{width:'50%'}}>Description</th>
                    <th>Subscription Charges</th>
                    <th>GST</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rtkPlans.map((elem, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td style={{textAlign:'justify'}}>{elem.cors_plan}</td>
                        <td style={{textAlign:'justify'}}>{elem.cors_description}</td>
                        <td>₹ {Number(elem.subscription_charges).toFixed(2)}</td>
                        <td>₹ {Number(elem.GST_amt).toFixed(2)}</td>
                        <td>₹ {(Number(elem.subscription_charges) + Number(elem.GST_amt)).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ marginTop: "20px" }}>
            &#11162; &nbsp; &nbsp;Details of the RTK connection settings can be
            found on{" "}
            <Link
            className="text-decoration-none"
              to="https://cors.surveyofindia.gov.in/connection-settings"
              target="_blank"
            >
              https://cors.surveyofindia.gov.in/connection-settings
            </Link>
            .
          </p>
        </div>
        <div className="row row-content">
          <div className="col-md-12 col-lg-8 text-content">
            <h5 className="content-heading">b. DGNSS Services:</h5>
            <p>
              &#11162; &nbsp; This service is used to achieve the location of a
              point in real-time with a relative positioning accuracy of 30-40
              cm when following a set of best practices.{" "}
            </p>
            <p>
              &#11162; &nbsp; To avail these services users need to have an
              DGNSS-enabled GNSS Rover and Internet connectivity at the site
              location.
            </p>
            <p>
              &#11162; &nbsp; The users need to register themselves first on the
              CORS web portal using{" "}
              <Link
                className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/registration"
                target="_blank"
              >
                https://cors.surveyofindia.gov.in/registration
              </Link>{" "}
              and the SOP for registration can be found {" "}
              <Link
                className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/policies/registration_sop.pdf"
                target="_blank"
              >
                here.. <i className="fa-solid fa-square-up-right"></i>
              </Link>
            </p>
            <p>
              &#11162; &nbsp; After successful registration users need to
              purchase the subscription in order to avail the RTK services.
              Subscriptions are available free of charge basis to Central Govt.
              users, State Govt. users, and Govt. academic institutions. For
              rest of the categories i.e. PSU and Private users, they are
              required to purchase the subscription using{" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/subscription"
                target="_blank"
              >
                https://cors.surveyofindia.gov.in/subscription
              </Link>{" "}
              and the SOP for purchase of subscription can be found {" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/policies/subscription_sop.pdf."
                target="_blank"
              >
                here.. <i className="fa-solid fa-square-up-right"></i>
              </Link>{" "}
            </p>
          </div>
          <div className="col-md-12 col-lg-4">
            <h6 className="s_img_header">
              Refer below image to know the DGNSS operational areas:{" "}
            </h6>
            <div className="s_imgBox">
              <center>
                <img className="s_img" src="/images/RTPS.jpg" alt="RTPS" />
              </center>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <h5 className="s_img_header">
              The following are the details of the DGNSS Subscription charges:
            </h5>
            <div className="table-div">
              <table className="content-table ">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Plan</th>
                    <th style={{width:'50%'}}>Description</th>
                    <th>Subscription Charges</th>
                    <th>GST</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dgnssPlans.map((elem, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td style={{textAlign:'justify'}}>{elem.cors_plan}</td>
                        <td style={{textAlign:'justify'}}>{elem.cors_description}</td>
                        <td>₹ {Number(elem.subscription_charges).toFixed(2)}</td>
                        <td>₹ {Number(elem.GST_amt).toFixed(2)}</td>
                        <td>₹ {(Number(elem.subscription_charges) + Number(elem.GST_amt)).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ marginTop: "20px" }}>
            &#11162; &nbsp; &nbsp;Details of the RTK connection settings can be
            found on{" "}
            <Link
            className="text-decoration-none"
              to="https://cors.surveyofindia.gov.in/connection-settings"
              target="_blank"
            >
              https://cors.surveyofindia.gov.in/connection-settings
            </Link>
          </p>
        </div>
        <div className="row row-content">
          <h4 className="content-heading">2. Reference Data Services</h4>
          <div className="col-md-12 col-lg-8 text-content">
            <h5 className="content-heading">
              a. Downloading of RAW Data of CORS Stations (RDS):{" "}
            </h5>
            <p>
              &#11162; &nbsp; This service is used to download the past data of
              the CORS and to generate the Virtual Rinex at any location within
              the CORS Network.
            </p>
            <p>
              &#11162; &nbsp; The users need to register themselves first on the
              CORS web portal using{" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/registration"
                target="_blank"
              >
                https://cors.surveyofindia.gov.in/registration
              </Link>{" "}
              and the SOP for registration can be found {" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/policies/registration_sop.pdf"
                target="_blank"
              >
                here.. <i className="fa-solid fa-square-up-right"></i>
              </Link>
            </p>
            <p style={{ marginBottom: "10px" }}>
              &#11162; &nbsp; After successful registration users need to
              purchase the subscription in order to avail the RTK services.
              Subscriptions are available free of charge basis to Central Govt.
              users, State Govt. users, and Govt. academic institutions. For
              rest of the categories i.e. PSU and Private users, they are
              required to purchase the subscription using{" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/subscription"
                target="_blank"
              >
                https://cors.surveyofindia.gov.in/subscription
              </Link>{" "}
              and the SOP for purchase of subscription can be found {" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/policies/subscription_sop.pdf."
                target="_blank"
              >
                here.. <i className="fa-solid fa-square-up-right"></i>
              </Link>{" "}
            </p>
          </div>
          <div className="col-md-12 col-lg-4">
            <h6 className="s_img_header">
              Refer below image to know the RTK operational areas:{" "}
            </h6>
            <div className="s_imgBox">
              <center>
                <img className="s_img" src="/images/PRDS.jpg" alt="PRDS" />
              </center>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <h5 className="s_img_header">
              The following are the details of the RTK Subscription charges:
            </h5>
            <div className="table-div">
              <table className="content-table ">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Plan</th>
                    <th style={{width:'50%'}}>Description</th>
                    <th>Subscription Charges</th>
                    <th>GST</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rdsPlans.map((elem, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td style={{textAlign:'justify'}}>{elem.cors_plan}</td>
                        <td style={{textAlign:'justify'}}>{elem.cors_description}</td>
                        <td>₹ {Number(elem.subscription_charges).toFixed(2)}</td>
                        <td>₹ {Number(elem.GST_amt).toFixed(2)}</td>
                        <td>₹ {(Number(elem.subscription_charges) + Number(elem.GST_amt)).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ marginTop: "20px", textAlign: "justify" }}>
            &#11162; &nbsp; The users are advised to download only 1 day of GNSS
            data of 5 CORS in one order using the online web portal. For bulk
            data requirements please contact CORS <br />
            Control Centre using the email{" "}
            <Link to="mailto:cors-grb.soi@gov.in">
              cors-grb.soi@gov.in
            </Link> or <Link to="mailto:grb.soi@gov.in">grb.soi@gov.in</Link>{" "}
            and for more detail about how to contact please visit{" "}
            <Link
            className="text-decoration-none"
              to="https://cors.surveyofindia.gov.in/contact-us"
              target="_blank"
            >
              https://cors.surveyofindia.gov.in/contact-us
            </Link>
            .
          </p>
        </div>
        <div className="row row-content">
          <div className="col-md-12 col-lg-8 text-content">
            <h5 className="content-heading">
              b. Online Data Processing (OPS):
            </h5>
            <p>
              &#11162; &nbsp; This service is used to process the static
              coordinate of the target points (points on which GNSS observation
              has been carried out using Geodetic Receiver) w.r.t. CORS Network.
            </p>
            <p>
              &#11162; &nbsp; The users need to register themselves first on the
              CORS web portal using{" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/registration"
                target="_blank"
              >
                https://cors.surveyofindia.gov.in/registration
              </Link>{" "}
              and the SOP for registration can be found {" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/policies/registration_sop.pdf"
                target="_blank"
              >
                here.. <i className="fa-solid fa-square-up-right"></i>
              </Link>
            </p>
            <p>
              &#11162; &nbsp; After successful registration users need to
              purchase the subscription in order to avail the DGNSS services.
              Subscriptions are available free of charge basis to Central Govt.
              users, State Govt. users, and Govt. academic institutions. For
              rest of the categories i.e. PSU and Private users, they are
              required to purchase the subscription using{" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/subscription"
                target="_blank"
              >
                https://cors.surveyofindia.gov.in/subscription
              </Link>{" "}
              and the SOP for purchase of subscription can be found {" "}
              <Link
              className="text-decoration-none"
                to="https://cors.surveyofindia.gov.in/policies/subscription_sop.pdf."
                target="_blank"
              >
                here.. <i className="fa-solid fa-square-up-right"></i>
              </Link>{" "}
              .
            </p>
          </div>
          <div className="col-md-12 col-lg-4">
            <h6 className="s_img_header">
              {" "}
              Refer below image to know the Online Data Processing operational
              areas:{" "}
            </h6>
            <div className="s_imgBox">
              <center>
                <img className="s_img" src="/images/PRDS.jpg" alt="PRDS" />
              </center>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <h5 className="s_img_header">
              The following are the details of the Online Data Processing
              Subscription charges:
            </h5>
            <div className="table-div">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Plan</th>
                    <th style={{width:'50%'}}>Description</th>
                    <th>Subscription Charges</th>
                    <th>GST</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {opsPlans.map((elem, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td style={{textAlign:'justify'}}>{elem.cors_plan}</td>
                        <td style={{textAlign:'justify'}}>{elem.cors_description}</td>
                        <td>₹ {Number(elem.subscription_charges).toFixed(2)}</td>
                        <td>₹ {Number(elem.GST_amt).toFixed(2)}</td>
                        <td>₹ {(Number(elem.subscription_charges) + Number(elem.GST_amt)).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ marginTop: "20px" }}>
            &#11162; &nbsp;The users are advised to process GNSS data of 1 day
            of 5 CORS in one order using the online web portal.
          </p>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default CorsServices;
