import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import Slider from "./Slider";

const Footer = () => {
  return (
    <>
      <Slider />
      <footer className="footer p-4 text-light pb-1 footer-dd">
        <div className="container-fluid col-md-12 col-lg-12 col-xl-12 ">
          <div className="row mx-4">
            <div className="col-md-6 col-lg-3 col-xl-3 mt-4">
              <h5 className="footer_head">Contact Us</h5>
              <ul className="list-unstyled mt-4">
                <li>
                  {" "}
                  <i className="fa-solid fa-location-dot"></i> &nbsp; Geodetic
                  And Research Branch, <br /> Survey of India, 17 E.C. Road,{" "}
                  <br />
                  Dehradun-248001
                </li>
                <li>
                  {" "}
                  <i className="fa-solid fa-tty"></i> &nbsp; Phone:
                  0135-2975366, <br /> 0135-2713296
                </li>
                <li>
                  {" "}
                  <i className="fa-solid fa-at"></i> &nbsp; Email:{" "}
                  <a to="mailto:cors-grb.soi@gov.in" className="text-light">
                    cors-grb.soi@gov.in
                  </a>
                </li>
              </ul>
              <div className="social-icons mt-3 mb-3">
                <Link
                  to="https://x.com/i/flow/login?redirect_after_login=%2Findia_soi"
                  target="_blank"
                >
                  <i className="fab fa-twitter fa-xl"></i>
                </Link>
                <Link to="https://www.facebook.com/SOIDST" target="_blank">
                  <i className="fab fa-facebook-f fa-xl"></i>
                </Link>
                <Link
                  to="https://www.instagram.com/surveyofindia_dst/"
                  target="_blank"
                >
                  <i className="fab fa-instagram fa-xl"></i>
                </Link>
                <Link
                  to="https://www.linkedin.com/company/survey-of-india-dist?trk=public_post_feed-actor-name"
                  target="_blank"
                >
                  <i className="fab fa-linkedin-in fa-xl"></i>
                </Link>
                <Link to="https://www.youtube.com/@soicors" target="_blank">
                  <i className="fab fa-youtube fa-xl"></i>
                </Link>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-xl-3 mt-4">
              <h5 className="footer_head">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/faq" className="text-light custom_link">
                    <i className="fa-solid fa-right-from-bracket"></i>&emsp;FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/rti" className="text-light custom_link">
                    <i className="fa-solid fa-right-from-bracket"></i>&emsp;RTI
                  </Link>
                </li>
                <li>
                  <Link to="/feedback" className="text-light custom_link">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    &emsp;Feedback
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.pgportal.gov.in/"
                    className="text-light custom_link"
                    target="_blank"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    &emsp;Public Grievances
                  </Link>
                </li>
                <li>
                  <Link
                    to="/software-plugins"
                    className="text-light custom_link"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    &emsp;Software and Plugins
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accessbilityStatement"
                    className="text-light custom_link"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    &emsp;Accessibility Statement
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-6 col-lg-3 col-xl-3 mt-4">
              <h5 className="footer_head">Website Policies</h5>
              <ul className="list-unstyled">
                <li>
                  <Link
                    to="/accessbilityOptions"
                    className="text-light custom_link"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    &emsp;Accessibility Options
                  </Link>
                </li>
                <li>
                  <Link to="/privacyPolicy" className="text-light custom_link">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    &emsp;Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hyperlinkingPolicy"
                    className="text-light custom_link"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    &emsp;Hyperlinking Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/copyrightPolicy"
                    className="text-light custom_link"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    &emsp;Copyright Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/termsConditions"
                    className="text-light custom_link"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    &emsp;Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-light custom_link">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    &emsp;Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-6 col-lg-3 col-xl-3 mt-4">
              <h5 className="footer_head">Locate Us</h5>
              <div>
                <iframe
                  style={{ height: "250px", width: "100%" }}
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=17%20E,%20Canal%20Road,%20Survey%20Chowk,%20Dalanwala,%20Dehradun,%20Uttarakhand%20248001&t=&z=13&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xl-12 fs-1 text-light text-center">
              <hr />
              <p className="m-0 pt-0">
                Website Content Owned and Managed by CORS Processing and
                Monitoring Center
                <br />
                2024 © CORS | Survey of India | All Rights Reserved.
              </p>
              <p>Last Updated on: 12-Sep-2024 02:25 PM</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
