import HeaderLayout from "../../components/HeaderLayout";
import "../general-info.css";
import "../registration.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import toast from 'react-hot-toast';
import { regiMob,getAllMob } from "../../services/Apis";

const Registration = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState("");
  const [mobile_no, setMobileNo] = useState("");
  const [captchaValue, setCaptchaValue] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(null);
  const [isMob, setIsMob] = useState([]); 
  
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
    fetchMob(); 
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isAlreadyRegistered = isMob.some(
      (item) => item.mobile_no === mobile_no && item.region === region
    );
  
    if (isAlreadyRegistered) {
      toast.error(`This number (${mobile_no}) is already registered for ${region}!`);
      return;
    }
    if (!isCaptchaValid) {
      toast.error("Captcha is incorrect!");
      return;
    }

    if (!region || !mobile_no) {
      toast.error("Please fill in all the fields.");
      return;
    }

    const data = { region, mobile_no };

    try {
      const res = await regiMob(data);
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("otp", res.data.otp);
        localStorage.setItem("otpExpiry", res.data.otpExpiry);
        navigate("/reg", { state: { region, mobile_no } });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <HeaderLayout>
        <div className="container clear">
          <div className="section_heading mx-2">
            <h2 className="title_heading">CORS Registration</h2>
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
                </div>
                {isCaptchaValid === false && <p className="text-danger">Captcha is incorrect !!</p>}
                <input
                  type="submit"
                  className="btn custom-sub-btn btn-lg"
                  value="Proceed"
                  id="submit-btn"
                  onClick={handleCaptchaValidation}
                />
              </form>
            </div>
          </div>
        </div>
      </HeaderLayout>
    </>
  );
};

export default Registration;








