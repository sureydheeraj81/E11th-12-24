import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./registrationForm.css";
import HeaderLayout from "../../components/HeaderLayout";

const RegisterSuccess = () => {
  const location = useLocation();
  const { appNum } = location.state || {};
  const navigate=useNavigate()
  useEffect(()=>{
    restricNav(appNum)

  },[appNum])
  const restricNav=(appNum)=>{
    if (!appNum) navigate('/registration')


  }


  return (
    <>
      <HeaderLayout>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="text-center">Thanks for Registration!</h2>
              <div className="card p-4 success-card my-4">
                <div className="align-items-center">
                  <div className="text-center">
                    <span
                      className="check-icon text-success"
                      style={{ fontSize: "5rem" }}
                    >
                      &#10003;
                    </span>
                    <h4>Registration Successful!</h4>
                    <p className="mb-0">
                      Your application for CORS Services is submitted
                      successfully. Your application no is{" "}
                      <strong>{appNum}</strong>. Keep this number for future
                      correspondence regarding your application. On successful
                      verification of documents, your account will be activated
                      within 24 working hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeaderLayout>
    </>
  );
};

export default RegisterSuccess;
