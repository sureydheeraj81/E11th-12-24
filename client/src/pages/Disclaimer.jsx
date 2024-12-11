import React from "react";
import HeaderLayout from "../components/HeaderLayout";

const Disclaimer = () => {
  return (
    <HeaderLayout>
      <div className="container clear">
        <div className="section_heading">
          <h2 className="title_heading">Disclaimer</h2>
        </div>
        <div className="row">
          <div className="col-md-12 text-content clear">
            <p style={{ marginLeft: "25px" }}>
              Survey of India shall not be liable for any loss or damage
              whatsoever, including incidental or consequential loss or damage,
              arising out of, or in connection with, any use of or reliance on
              the information from this website.
            </p>
            <p style={{ marginLeft: "25px" }}>
              In case of any suggestion, clarification of doubt or query, users
              are requested to refer to the original documents by contacting the
              issuing authority.
            </p>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Disclaimer;
