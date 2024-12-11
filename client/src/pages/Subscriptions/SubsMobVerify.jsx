import HeaderLayout from "../../components/HeaderLayout";
import "../general-info.css";
import "../registration.css";
import { useState, useEffect } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { subsMobVerify, subsMob } from "../../services/Apis"


const SubsMobVerify = () => {
  // const otpexp = localStorage.getItem('otpExpiry');

  const navigate = useNavigate();
  const location = useLocation();
  const { region, mobile_no } = location.state || {};
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [verifyOtp, setVerifyOtp] = useState({
    userEnteredOtp: "",
    mobile_no: mobile_no,
  });

  const restricNav = (region, mobile_no) => {
    if (!mobile_no || !region) navigate('/subscription')
  }

  useEffect(() => {
    setVerifyOtp((prev) => ({
      ...prev,
      userEnteredOtp: otp.join(""),
    }));
    restricNav(region, mobile_no)
   
  }, [otp, region, mobile_no]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('logindata',true)
    const currentTime = new Date().getTime();
 // let logindata=localStorage.getItem('logindata')
    // if(logindata){
    //   navigate('/subscription1/plan')
    // }

    // && otpexp > currentTime
    try {
      const response = await subsMobVerify(verifyOtp)


      if (response.data) {
        localStorage.setItem('isModified', 'true');


        navigate('/get-subscription', { state: { region, mobile_no } });
      } else {
        toast.error("Invalid OTP or OTP has expired.");
      }

    } catch (error) {
      toast.error("An error occurred while verifying the OTP.");

    }


  };

  const resendOtp = async (e) => {

    e.preventDefault();

    try {
      const data = { region, mobile_no };
      const response = await subsMob(data);


      if (response.data.success === true) {
        localStorage.setItem(`otp`, response.data.otp)
        localStorage.setItem('otpExpiry', response.data.otpExpiry)

        toast.success(`OTP has been resended on ${mobile_no}`)

      }
      else if (response.success === false) {
        toast.error(response.data.message)

      }


    } catch (error) {
      // if (error.response.data.success === false) {
      //     toast.error(error.response.data.message)
      // }
      toast.error("An error occurred while resending the OTP.");


    }
  };

  return (
    <>
      <HeaderLayout>
        <div className="container clear">
          <div className="section_heading mx-2">
            <h2 className="title_heading">CORS Subscription</h2>
          </div>
          <div className="row">
            <div className="col-md-6" style={{ marginTop: "50px" }}>
              <form
                name="frm1"
                onSubmit={handleSubmit}
                style={{
                  fontSize: "15px",
                  color: "black",
                  padding: "0px 20px",
                }}
              >
                <h5>Select Region</h5>
                {/* <input
                  className="custom_input"
                  type="hidden"
                  name="token"
                  value={token}
                /> */}
                <label>Region</label>
                <span className="ic-span">
                  <i className="fa-solid fa-earth-asia fa-xl form-icon"></i>
                  <select
                    name="region"
                    className="custom_input"
                    id="regionID"
                    disabled
                    required
                    defaultValue={region}
                    
                  >
                    <option value="">Select Region</option>
                    <option value="region-1">Region-1</option>
                    <option value="region-2">Region-2</option>
                  </select>
                </span>
                <br />
                <label>Mobile</label>
                <span className="ic-span">
                  <i className="fa-solid fa-mobile-retro fa-xl form-icon"></i>
                  <input
                    className="custom_input"
                    type="text"
                    name="mobile_no"
                    placeholder="Enter Mobile No for OTP"
                    disabled
                    minLength="10"
                    maxLength="10"
                    required
                    defaultValue={mobile_no}
                  />
                </span>
                <br />
                <i
                  className="fa-solid fa-unlock-keyhole fa-xl form-icon"
                  style={{ marginRight: "20px" }}
                ></i>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    className="otp custom_input"
                    type="text"
                    id={`otp-${index}`}
                    required
                    value={digit}
                    onInput={(e) => handleOtpChange(index, e.target.value)}
                    maxLength={1}
                    style={{ width: "38px", marginRight: "10px" }}
                  />
                ))}
                <input
                  type="hidden"
                  name="otpTest"
                  id="otpTest"
                  required
                  value={otp.join("")}
                />
                <input
                  type="button"
                  className="btn submit-btn btn-danger"
                  id="resend-btn"
                  style={{ width: "120px", height: "40px", marginLeft: "10px" }}
                  onClick={resendOtp}
                  value="Resend OTP"
                />
                <span id="show"></span>
                <p className="text-danger" style={{ fontSize: '14px' }}>
                  * If you do not receive the OTP within 60 seconds, please click
                  "RESEND OTP" button to request OTP again!
                </p>
                <input
                  type="submit"
                  name="submit"
                  className="btn submit-btn custom-sub-btn btn-lg"
                  id="submit-btn"
                  value="Verify OTP"
                />
              </form>
            </div>
          </div>
        </div>
      </HeaderLayout>
    </>
  );
};

export default SubsMobVerify;
