import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FinalSubsPayment } from "../../services/Apis";
import HeaderLayout from "../../components/HeaderLayout";
import toast from 'react-hot-toast';

const MAX_FILE_SIZE = 750 * 1024;

function BharatKoshForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const { userData, sendCorsPlan, cardItems, grandTotal, totalGST, totalSubscriptionCharges } = location.state || {};
  const [files, setFiles] = useState({
    path_sub_pdf: null,
  });

  const [formData, setFormData] = useState({
    subs_receiptNo: "",
    subs_receiptAmt: "",
    name: userData.name,
    email: userData.email,
    mobile: userData.mobile,
    address: userData.address,
    state_id: userData.state_id,
    user_reg_id: userData.user_reg_id,
    gstInvoice: "",
    region_name: userData.region,
    subscription_charge: totalSubscriptionCharges,
    gst_receiptAmt: totalGST,
    subs_receiptAmt: grandTotal,
    cors_plan: sendCorsPlan.cors_plan,
    GST_name: "",
    GST_number: "",
    path_sub_pdf: "",
  });

  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    restricNav();
  }, []);

  const restricNav = () => {
    if (!formData.name || !formData.mobile) navigate('/subscription');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds the maximum allowed size of 750 KB.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFiles({ ...files, [e.target.name]: null });
      return;
    }
    setFiles({ ...files, [e.target.name]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.gstInvoice === "Yes" && (!formData.GST_name || !formData.GST_number)) {
      toast.error("Please provide GST name and number.");
      return;
    }

    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    Object.keys(files).forEach((key) => {
      if (files[key]) form.append(key, files[key]);
    });

    setLoading(true); 

    try {
      const response = await FinalSubsPayment(form);

      if (response.data.success === true) {
        let ack_no = response.data.data.ack_no;

        toast.success("Form submitted successfully!");
        navigate("/subs-success", { state: { ack_no } });
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <HeaderLayout>
      <div className="container mt-5">
        <div className="text-success fw-bold text-center mb-3">
          <span className="check-icon text-success">&#10003;</span> Terms and
          Conditions Accepted!
        </div>

        {loading ? ( 
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h4 className="text-primary text-center mb-4">
              Depositor and BharatKosh Payment Details
            </h4>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-2 mx-4">
                  <label className="form-label">
                    Upload Bharatkosh Receipt{" "}
                    <span className="text-danger">(* PDF file Only!)</span>
                  </label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-file-import fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="file"
                      className="form-control"
                      required
                      accept="application/pdf"
                      name="path_sub_pdf"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">
                    Enter Transaction Ref. No. (As per Bharatkosh Receipt)
                  </label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-receipt fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="text"
                      className="form-control"
                      name="subs_receiptNo"
                      placeholder="Enter Reference Number"
                      value={formData.subs_receiptNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">Enter Amount</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-indian-rupee-sign fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="number"
                      className="form-control"
                      name="subs_receiptAmt"
                      value={formData.subs_receiptAmt}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">Depositor Name</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-user-tie fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      required
                      value={formData.name}
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">Depositor Email</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-at fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      value={formData.email}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-2 mx-4">
                  <label className="form-label">Depositor Mobile</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-mobile-screen fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="tel"
                      className="form-control"
                      name="mobile"
                      value={formData.mobile}
                      required
                      onChange={handleChange}
                      readOnly
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">Depositor Address</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-location-dot fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      required
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">State</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-landmark fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="text"
                      className="form-control"
                      name="state_id"
                      value={formData.state_id}
                      readOnly
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">Do you want GST invoice?</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-circle-question fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <select
                      className="form-select"
                      required
                      name="gstInvoice"
                      value={formData.gstInvoice}
                      onChange={handleChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>

                {formData.gstInvoice === "Yes" && (
                  <>
                    <div className="mb-2 mx-4">
                      <label className="form-label">Name as per GST</label>
                      <div className="d-flex gap-4">
                        <i className="fa-solid fa-user-tie fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                        <input
                          type="text"
                          className="form-control"
                          required
                          name="GST_name"
                          value={formData.GST_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="mb-2 mx-4">
                      <label className="form-label">GST Number</label>
                      <div className="d-flex gap-4">
                        <i className="fa-solid fa-hashtag fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                        <input
                          type="text"
                          className="form-control"
                          required
                          name="GST_number"
                          value={formData.GST_number}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="text-center my-4 ">
              <button
                type="submit"
                className="btn btn-lg col-md-3"
                style={{
                  background:
                    "radial-gradient(circle at 10% 20%, rgb(7, 121, 222) 0%, rgb(20, 72, 140) 90%)",
                  color: "#fff",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </HeaderLayout>
  );
}

export default BharatKoshForm;






