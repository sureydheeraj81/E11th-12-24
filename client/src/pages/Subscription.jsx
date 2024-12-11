import HeaderLayout from "../components/HeaderLayout";
import "./general-info.css";
import "./registration.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { HashLink } from "react-router-hash-link";
import toast from 'react-hot-toast';
import { subsMob, getAllMob } from "../services/Apis"


const Subscription = () => {

  const navigate = useNavigate();

  const [region, setRegion] = useState("");
  const [mobile_no, setMobileNo] = useState("");
  const [isMob, setIsMob] = useState([]);
  const [captchaValue, setCaptchaValue] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(null);

  const fetchMob = async () => {
    try {
      const resCate = await getAllMob();
      setIsMob(resCate.data.data);
    } catch (error) {
      toast.error('Error fetching data:');
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6, "#ccebff");
    fetchMob()

  }, []);



  const handleCaptchaChange = (e) => {
    setCaptchaValue(e.target.value);
  };


  const handleCaptchaValidation = () => {
    if (validateCaptcha(captchaValue)) {
      setIsCaptchaValid(true);
    } else {
      setIsCaptchaValid(false);
    }
  };

  const saveUserProfile = (userData) => {
    const userProfile = {
      name: userData.name,
      state: userData.state,
      address: userData.address,
      email: userData.email,
      region: userData.region,
      username: userData.username,
      pincode: userData.pincode,
      mobile_no: userData.mobile_no,
      company_name: userData.company_name,
      sno: userData.sno
    };
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAlreadyRegistered = isMob.some((item) => item.mobile_no === mobile_no && item.region === region);

    if (!isAlreadyRegistered) {
      toast.error(`This number (${mobile_no}) is not registered for ${region} !!!`);
      return;
    }

    if (!isCaptchaValid) {
      toast.error("Captcha is incorrect!");
      return;
    }
    const data = { region, mobile_no };

    try {
      const response = await subsMob(data);
      console.log("Form submitted successfully:", response);
      localStorage.setItem(`otp`, response.data.otp)
      localStorage.setItem('otpExpiry', response.data.otpExpiry)

     
      saveUserProfile(response.data.otpdata);

      if (response.data.success === true) {
        toast.success(response.data.message)
        navigate('/subs-otp', { state: { region, mobile_no } })

      } else if (response.status == 400) {
        toast.error("this mobile is not register for this region")
        
      }


    } catch (error) {
      toast.error(`someting wrong`)
      // if (error.response.data.success === false) {
      // }

    }
  };





  return (
    <>
      <HeaderLayout>
        <div className="container clear">
          <div className="section_heading mb-0 mx-2">
            <h2 className="title_heading">CORS Subscription</h2>
          </div>
          <div className="row">
            <div className="col-md-6" style={{ marginTop: '50px' }}>
              <form
                name="frm1"
                onSubmit={handleSubmit}
                style={{
                  fontSize: "15px",
                  color: "black",
                  padding: "0px 20px",
                }}
              >

                <label>Region</label>
                <span className="ic-span">
                  <i className="fa-solid fa-earth-asia fa-xl form-icon"></i>
                  <select
                    name="region"
                    className="custom_input"
                    id="regionID"
                    required
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="">Select Region</option>
                    <option value="region-1">Region-1</option>
                    <option value="region-2">Region-2</option>
                  </select>
                </span>
                <br />
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                  to="/images/region.jpg"
                >
                  Click here to know your Region
                </Link>
                <br />
                <HashLink
                  smooth
                  to={"/subscription#cors-services"}
                  className="link"
                >
                  Click here to know the Availability of CORS Services
                </HashLink>
                <br />
                <br />
                <label>Mobile</label>
                <span className="ic-span">
                  <i className="fa-solid fa-mobile-retro fa-xl form-icon"></i>
                  <input className="custom_input"
                    type="text"
                    name="mobile_no"
                    placeholder="Enter Mobile No for OTP"
                    minLength="10"
                    maxLength="10"
                    required
                    value={mobile_no}
                    onChange={(e) =>
                      setMobileNo(e.target.value.replace(/[^0-9]/g, ""))
                    }
                  />
                </span>
                <label>Captcha</label>
                <div className="row">
                  <div className="col-md-7">
                    <span className="ic-span">
                      <i className="fa-solid fa-microchip fa-xl form-icon"></i>
                      <input className="custom_input"
                        type="text"
                        required
                        value={captchaValue}
                        onChange={handleCaptchaChange}
                      />
                    </span>
                  </div>
                  <div className="col-md-5">
                    <LoadCanvasTemplateNoReload className="captcha-canvas" />
                  </div>
                  {isCaptchaValid === false && <p className="text-danger">Captcha is incorrect !!</p>}
                </div>
                <input
                  type="submit"
                  className="btn custom-sub-btn btn-lg"
                  value="Proceed"
                  id="submit-btn"
                  onClick={handleCaptchaValidation}
                />
              </form>
            </div>
            <div className="col-md-6 mt-4">
              <div className="d-none d-md-block d-lg-block mt-4">
                <img src="/images/subscribe.png" alt="subscribe" style={{ maxWidth: '500px' }} />
              </div>
            </div>
          </div>
          <div className="row" id="cors-servies">
            <div className="col-md-12 mt-4">
              <h4 style={{ fontStyle: 'italic', textAlign: 'center' }}>CORS Services Availability</h4>
              <hr style={{ border: '1px solid #000' }} />
              <div className="text-desc clear">
                <h5>There are two types of Service being made available by SoI:</h5>
                <ol>
                  <li>
                    <strong>Real Time Positioning Services (RTPS)</strong>
                    <ul>
                      <li>Network RTK Services for 3 – 4 centimeter real time positioning.</li>
                      <li>D-GNSS Services for 30 – 40 centimeter accurate real time positioning.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Reference Data Services (RDS)</strong>
                    <ul>
                      <li>Online Data processing of static observation with respect to CORS.</li>
                      <li>Downloading of RAW Data of CORS Stations for processing in user software.</li>
                    </ul>
                  </li>
                </ol>
                <p>The CORS services availability are divided into 3 Regions,
                  Each region is divided into 3 Zones, based on current service availability.
                </p>

                <h5>Region 1</h5>
                <p>
                  Includes states of Punjab, Himachal Pradesh, Uttarakhand, Haryana, Rajasthan, Uttar Pradesh, Bihar, Madhya Pradesh, Chhattisgarh, Telangana, Assam, Arunachal Pradesh, Tripura, Manipur, Mizoram, Meghalaya, Nagaland and Union Territories of Delhi NCR, and Chandigarh. Region 1 is further divided into 3 zones:
                </p>
                <ul>
                  <li>
                    <strong>Zone 1:</strong> All RTPS and RDS are available.
                  </li>
                  <li>
                    <strong>Zone 2:</strong> RTPS of only 30-40 cm are available but all RDS are available. This includes the state of Bihar, parts of North Eastern states, some forest patches, and border areas in Rajasthan and Central India.
                  </li>
                  <li>
                    <strong>Zone 3:</strong> Currently no RTPS or RDS are available due to communication issues. Services in these regions will be operationalized shortly.
                  </li>
                </ul>

                <h5>Region 2</h5>
                <p>
                  Includes states of Gujarat, Maharashtra, Goa, Karnataka, Kerala, Orissa, Jharkhand, West Bengal, and Sikkim and Union Territories of Dadra and Nagar Haveli and Daman and Diu, Lakshadweep, and Andaman and Nicobar Island. Region 2 is further divided into 3 zones:
                </p>
                <ul>
                  <li>
                    <strong>Zone 1:</strong> All RTPS and RDS are available.
                  </li>
                  <li>
                    <strong>Zone 2:</strong> RTPS of only 30-40 cm are available but all RDS are available. This includes some forest patches and border areas in Central India and some parts of islands.
                  </li>
                  <li>
                    <strong>Zone 3:</strong> Currently no RTPS or RDS are available due to communication issues. Services in these regions will be operationalized shortly.
                  </li>
                </ul>

                <h5>Region 3</h5>
                <p>
                  Includes states of Andhra Pradesh and Tamil Nadu and the Union Territory of Puducherry. CORS infrastructure in Andhra Pradesh and Tamil Nadu is being operated and maintained by the State Government.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div>
              <h3 className="content-heading">1. Real Time Positioning Services</h3>
            </div>
            <div className="col-md-6 px-4">
              <img src="/images/RTPS.jpg" alt="RTPS" style={{ maxWidth: '400px' }} />
            </div>
            <div className="col-md-6 px-4 mt-4">
              <div className="text-desc">
                <p>
                  The availability of Real Time Services of 3 – 4 centimeter RTPS using Network RTK, are available in Region 1 and Region 2 (i.e. Zone 1 as highlighted in green wash)
                </p>
                <p>
                  The availability of Real Time Services of 30 – 40 centimeter using D-GNSS services, are available in Region 1 & Region 2 (i.e. Zone 2 as highlighted in green and yellow wash)
                </p>
                <p>
                  No RTPS are currently available in Zone 3 (as highlighted in red wash).
                </p>
                <p>
                  For RTPS in Region 3 (highlighted in blue-green), governments of Andhra Pradesh and Tamil Nadu may be contacted.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div>
              <h3 className="content-heading">2. Reference Data Services</h3>
            </div>
            <div className="col-md-6 px-4">
              <img src="/images/PRDS.jpg" alt="PRDS" style={{ maxWidth: '400px' }} />
            </div>
            <div className="col-md-6 px-4 mt-4">
              <div className="text-desc">
                <p>
                  Both type of Reference Data Services i.e., Online Data processing as well as Downloading of RAW Data of CORS Stations are available for entire Region 1 and Region 2 (i.e. Zone 1 and Zone 2 as highlighted in Green).
                </p>
                <p>
                  RDS is not currently available in Zone 3 (highlighted in Red) through this portal. Further details regarding availability of services in these region will be provided
                </p>
                <p>
                  For RDS in Region 3 (highlighted in blue-green), governments of Andhra Pradesh and Tamil Nadu may be contacted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </HeaderLayout>
    </>
  )
}

export default Subscription