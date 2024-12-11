import React, { useEffect, useState } from "react";
import "./navbar.css";
import "./header.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import Footer from "./Footer";

const HeaderLayout = ({ children }) => {
  const [navbarFixed, setNavbarFixed] = useState(false);
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector("header").offsetHeight;
      if (window.scrollY > headerHeight) {
        setNavbarFixed(true);
      } else {
        setNavbarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Helper function to check if the dropdown should be active
  const isDropdownActive = (paths) => {
    return paths.some((path) => location.pathname.includes(path));
  };

  return (
    <div>
      <header className="container-fluid pt-2">
        <div className="row d-flex justify-content-between top-header-box">
          <div className="col-md-4 logo-div">
            <img
              src="/images/logo_survey_logo.png"
              alt="Survey of India"
              className="img-fluid logo"
            />
          </div>
          <div className="col-md-4 text-center d-none d-lg-block">
            <div className="banner">
              Ā SETU HIMACHALAM - FROM KANYAKUMARI TO THE HIMALAYAS
            </div>
            <p className="banner-text">
              Welcome to the CORS Registration Portal
            </p>
          </div>
          <div className="col-md-4 logo-div text-end">
            <img
              src="/images/eage-logo.png"
              alt="Department of Science and Technology"
              className="img-fluid logo2"
            />
          </div>
        </div>
      </header>

      <nav className={`navbar navbar-expand-lg ${navbarFixed ? "fixed-top" : ""}`}>
        <div className="container-fluid nav-div">
          <div className="d-flex justify-content-between nav-mini">
            <div className="d-block d-lg-none">
              <Link to="/" className="mobile-nav">
                CORS Registration Portal
              </Link>
            </div>
            <button
              className="navbar-toggler tg-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa-solid fa-bars fa-xl custom-toggler"></i>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto">
              <NavLink to="/" className="nav-link text-white">
                Home
              </NavLink>
              <NavLink
                to="https://www.surveyofindia.gov.in/pages/who-we-are"
                target="_blank"
                className="nav-link text-white"
              >
                About SOI
              </NavLink>

              <li className={`nav-item dropdown ${isDropdownActive(["/policies"]) ? "active" : ""}`}>
                <Link
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Policies
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/policies/National Geospatial Policy.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      National Geospatial Policy-2022
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/policies/New Guidelines on Geospatial Data.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      New Guidelines Geospatial Policy-2021
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className={`nav-item dropdown ${isDropdownActive(["/cors-services", "/abbreviations",
               "/usages", "/advantages", "/requirements", "/connection-settings", 
               "/guidelines", "/video-tutorials"]) ? "active" : ""}`}>
                <Link
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  General Info
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/cors-services">
                      CORS Services
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/abbreviations">
                      Abbreviations Used and their Definitions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/usages">
                      Usages
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/advantages">
                      Advantages and Network RTK
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/requirements">
                      Requirements at User End
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/connection-settings">
                      Connection Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/guidelines">
                      Guidelines & Operating Procedures
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/video-tutorials">
                      Video Tutorials
                    </NavLink>
                  </li>
                </ul>
              </li>

              <NavLink to="/subscription-charges" className="nav-link text-white">
                Subscription Charges
              </NavLink>
              <NavLink to="/faq" className="nav-link text-white">
                FAQs
              </NavLink>
              <NavLink to="/contact-us" className="nav-link text-white">
                Contact Us
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      <div className="body">{children}</div>
      <Footer />
    </div>
  );
};

export default HeaderLayout;
