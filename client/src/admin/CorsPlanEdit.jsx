import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import "./styles/services-cors.css";
import { useState, useRef, useEffect } from "react";
import { updateSubsData } from "../services/Apis";
import toast from "react-hot-toast";

const CorsPlansEdit = () => {
  
  const location = useLocation();
  const [formData, setFormData] = useState({
    sno:0,
    cors_plan: "",
    cors_description: "",
    subscription_charges: "",
    GST_amt: "",
  });

  useEffect(() => {
    if (location.state) {
      setFormData({
        sno: location.state.sno,
        cors_plan: location.state.cors_plan,
        cors_description: location.state.cors_description,
        subscription_charges: location.state.subscription_charges,
        GST_amt: location.state.GST_amt,
      });
    }
  }, [location.state]);

  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateSubsData(formData.sno, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/services");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("There was a problem in adding the service!");
    }
    formRef.current.reset();
  };

  const discardChanges = (e) => {
    e.preventDefault();
    toast.error("Updating data discarded");
    formRef.current.reset();
    navigate("/admin/services");
  };
  return (
    <Sidebar>
      <div className="clear">
        <div className="section_heading">
          <h2 className="title_heading">CORS Subscription Plans</h2>
        </div>
        <div className="mb-4">
          <div className="box_header">
            <div>
              <button
                className="btn btn-link"
                data-bs-toggle="collapse"
                data-bs-target="#subscriptionForm"
                aria-expanded="true"
                aria-controls="subscriptionForm"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <i className="fa-solid fa-calendar-plus"></i>&emsp; Update
                Subscription Plan &emsp;
                <i className="fa-solid fa-caret-down cus-toggle"></i>
              </button>
            </div>
          </div>
          <div id="subscriptionForm" className="collapse show">
            <div className="box_body">
              <form ref={formRef} className="plan-form" onSubmit={handleSubmit}>
                <div className="row mt-2">
                  <label className="col-md-2">
                    Plan <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      name="cors_plan"
                      type="text"
                      required
                      className="col-md-6"
                      value={formData.cors_plan}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <label className="col-md-2">
                    Description <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <textarea
                      name="cors_description"
                      className="col-md-6"
                      required
                      value={formData.cors_description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="row mt-2">
                  <label className="col-md-2">
                    Subscription Charges <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      name="subscription_charges"
                      type="text"
                      className="col-md-6"
                      required
                      value={formData.subscription_charges}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <label className="col-md-2">
                    GST <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      name="GST_amt"
                      type="text"
                      required
                      className="col-md-6"
                      value={formData.GST_amt}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-2"></div>
                  <div className="col-md-4">
                    <button
                      className="btn btn-warning "
                      style={{ marginRight: "1rem" }}
                      onClick={discardChanges}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary " type="submit">
                      Update Service
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default CorsPlansEdit;
