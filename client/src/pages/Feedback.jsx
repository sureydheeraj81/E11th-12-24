import HeaderLayout from "../components/HeaderLayout";
import "./general-info.css";
import "./registration.css";
import "./feedback.css";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast'
import { submitFeedback } from "../services/Apis";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    feedback: "",
    captchaValue: "",
  });

  const [isCaptchaValid, setIsCaptchaValid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCaptchaEnginge(6, "#ccebff");
  }, []);

  // Update form data based on user input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Captcha validation
  const handleCaptchaValidation = () => {
    if (validateCaptcha(formData.captchaValue)) {
      setIsCaptchaValid(true);
      return true;
    } else {
      setIsCaptchaValid(false);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault(); 

    if (!handleCaptchaValidation()) {
      return;
    }
    try {
      const response = await submitFeedback(formData); // Call the helper function
      if (response.status === 201) {
        toast.success("Feedback submitted successfully!");
        navigate('/'); 
      } else {
        toast.error("Error submitting feedback.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("There was a problem submitting your feedback.");
    }


      // Clear the form after successful submission
      setFormData({
        name: "",
        email: "",
        mobile: "",
        feedback: "",
        captchaValue: "",
      });

      // Optionally, you may reload the captcha engine after the form reset
      loadCaptchaEnginge(6, "#ccebff");
  };

  return (
    <>
      <HeaderLayout>
        <div className="container clear">
          <div className="section_heading mx-2">
            <h2 className="title_heading">Feedback</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <label>
                  Name <span className="text-danger">*</span>
                </label>
                <div className="row">
                  <div className="col-md-12">
                    <span className="ic-span">
                      <i className="fa-regular fa-user fa-xl form-icon"></i>
                      <input className="custom_input" 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </span>
                  </div>
                </div>
                <label>Email</label>
                <div className="row">
                  <div className="col-md-12">
                    <span className="ic-span">
                      <i className="fa-solid fa-envelope fa-xl form-icon"></i>
                      <input className="custom_input" 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </span>
                  </div>
                </div>
                <label>Mobile</label>
                <div className="row">
                  <div className="col-md-12">
                    <span className="ic-span">
                    <i className="fa-solid fa-mobile-screen fa-xl form-icon"></i>
                      <input className="custom_input" 
                        type="text"
                        name="mobile"
                        maxLength="10"
                        pattern="\d{10}"
                        value={formData.mobile}
                        onChange={handleInputChange}
                      />
                    </span>
                  </div>
                </div>
                <label>Feedback</label>
                <div className="row">
                  <div className="col-md-12">
                    <span className="ic-span">
                      <i className="fa-solid fa-comment fa-xl form-icon"></i>
                      <textarea
                        name="feedback"
                        className="custom_input"
                        value={formData.feedback}
                        onChange={handleInputChange}
                        rows="3"
                      ></textarea>
                    </span>
                  </div>
                </div>
                <label>Captcha</label>
                <div className="row">
                  <div className="col-md-7">
                    <span className="ic-span">
                      <i className="fa-solid fa-microchip fa-xl form-icon"></i>
                      <input className="custom_input" 
                        type="text"
                        name="captchaValue"
                        value={formData.captchaValue}
                        onChange={handleInputChange}
                        required
                      />
                    </span>
                  </div>
                  <div className="col-md-4">
                    <LoadCanvasTemplateNoReload className="captcha-canvas" />
                  </div>
                  {isCaptchaValid === false && (
                    <p className="text-danger">Captcha is incorrect !!</p>
                  )}
                </div>
                <input 
                  type="submit"
                  className="btn custom-sub-btn btn-lg"
                  value="Submit"
                  id="submit-btn"
                />
              </form>
              <div className="mt-2 text-center" style={{width:'90%'}}>
             <i className="text-primary" style={{fontSize:'14px'}}>Note: Mobile and Email address is optional but for further communication please provide mobile or email.</i> </div>
            </div>
            <div className="col-md-6 feedback_div">
              <img
                src="/images/feed_back.jpeg"
                alt="feedback"
                height={400}
                width={400}
              />
            </div>
          </div>
        </div>
      </HeaderLayout>
    </>
  );
};

export default Feedback;
