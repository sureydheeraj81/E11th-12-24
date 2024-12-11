import React from "react";
import "../../components/header.css";

const AdminHeader = () => {
  return (

      <header className="container-fluid pt-2" style={{boxShadow:' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
        <div className="row d-flex justify-content-between top-header-box">
          {/* Left side logo and text */}
          <div className="col-md-4 logo-div">
            <img
              src="/images/logo_survey_logo.png"
              alt="Survey of India"
              className="img-fluid logo"
            />
          </div>
          {/* Middle Section */}
          <div className="col-md-4 text-center d-none d-lg-block">
            <div className="banner">
              Ā SETU HIMACHALAM - FROM KANYAKUMARI TO THE HIMALAYAS
            </div>
            <p className="banner-text">Welcome to the CORS Registration Portal</p>
          </div>
          {/* Right side logo */}
          <div className="col-md-4 logo-div text-end">
            <img
              src="/images/eage-logo.png"
              alt="Department of Science and Technology"
              className="img-fluid logo2"
            />
          </div>
        </div>
      </header>
  );
};

export default AdminHeader;
