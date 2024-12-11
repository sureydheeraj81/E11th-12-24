import React, { useState, useEffect, useRef } from "react";
import { UserRegister, getUserCategoryData, stateInfo, getAllMob } from "../../services/Apis";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderLayout from "../../components/HeaderLayout";
import { NavLink } from "react-router-dom";

const RegistrationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [stateData, setStateData] = useState([])
  const [categoryData, setCatetory] = useState([])
  const [loading, setLoading] = useState(false);
  const [isMob, setIsEmail] = useState([]);




  const { region, mobile_no } = location.state || {};

  const [files, setFiles] = useState({
    idtype_doc: null,
    upload_annexure: null,
    usertype_doc: null,
  });

  const [loginData, setLoginData] = useState({
    region: region,
    mobile_no: mobile_no,
    name: "",
    company_name: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    usertype: "",
    photo_id_type: "",
    category: "",
    idtype_doc: "",
    usertype_doc: "",
    emptype: "",
    category_other: "",
    upload_annexure: "",
  });
  const restricNav = (region, mobile_no) => {
    if (!mobile_no || !region) navigate('/registration')


  }

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const fileInputRef = useRef(null);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 750 * 1024;

    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds the maximum allowed size of 750 KB.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFiles({ ...files, [e.target.name]: null });
      return;
    }
    // setFiles({ ...files, [e.target.name]: file });

    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };




  const fetchState = async () => {
    try {
      const resCate = await getUserCategoryData();
      const response = await stateInfo();
      const resEmail = await getAllMob();
      setIsEmail(resEmail.data.data);

      setCatetory(resCate.data.data);
      setStateData(response.data.data);
    } catch (error) {
      toast.error('Error fetching data:');
    }
  };
  useEffect(() => {
    fetchState();
    restricNav(region, mobile_no)
  }, [region, mobile_no]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAlreadyRegistered = isMob.some(
      (item) => item.email === loginData.email && item.region === region
    );

    if (isAlreadyRegistered) {
      toast.error(`This Email (${loginData.email}) is already registered for ${region}!`);
      return;
    }

    const form = new FormData();
    Object.keys(loginData).forEach((key) => form.append(key, loginData[key]));
    Object.keys(files).forEach((key) => {
      if (files[key]) form.append(key, files[key]);
    });
    setLoading(true);
    try {
      const response = await UserRegister(form);

      setLoginData({
        region: "",
        mobile_no: "",
        name: "",
        company_name: "",
        email: "",
        address: "",
        district: "",
        state: "",
        pincode: "",
        usertype: "",
        photo_id_type: "",
        category: "",
        idtype_doc: "",
        usertype_doc: "",
        emptype: "",
        upload_annexure: "",
      });
      if (response.data.success === true) {
        let appNum = response.data.data.application_no;
        toast.success(
          response.data.message || "Data submitted successfully!!!"
        );
        navigate("/register-success", { state: { appNum } });
      }
    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };



  const renderPrivateUserForm = () => (
    <>
      <div className="mb-2 mx-4">
        <label className="form-label">Photo ID Type</label>
        <div className="d-flex gap-4">
          <i className="fa-solid fa-id-badge fa-2x mt-1" style={{ color: '#1050a2' }}></i>
          <select
            className="form-select"
            required
            name="photo_id_type"
            value={loginData.photo_id_type}
            onChange={handleChange}
          >
            <option>Select Photo ID Type</option>
            <option value="Aadhar Card">Aadhar Card</option>
            <option value="PAN Card">PAN Card</option>
            <option value="Voter ID Card">Voter ID Card</option>
          </select>
        </div>
      </div>

      <div className="mb-2 mx-4">
        <label className="form-label">Upload Photo ID Proof</label>
        <input
          type="file"
          className="form-control"
          required
          name="idtype_doc"
          onChange={handleFileChange}
          ref={fileInputRef}
          accept=".jpg,.jpeg,.png,.pdf"
        />
      </div>

      <div className="mb-2 mx-4">
        <label className="form-label">Upload Annexure</label>
        <input
          type="file"
          className="form-control"
          required
          name="upload_annexure"
          onChange={handleFileChange}
          ref={fileInputRef}
          accept=".jpg,.jpeg,.png,.pdf"
        />
        {loginData.usertype === "Private User" ? (
          <NavLink to="../../policies/private.pdf" className="text-decoration-none"
            rel='noopener noreferrer' target="_blank"
          >
            Download Annexure for Private User
          </NavLink>
        ) : loginData.usertype === "Govt User" ? (
          <NavLink to="../../policies/govt.pdf" className="text-decoration-none"
            rel='noopener noreferrer' target="_blank"
          >
            Download Annexure for Govt User
          </NavLink>
        ) : loginData.usertype === "Research/Academic User" ? (
          <NavLink to="../../policies/academic.pdf" className="text-decoration-none"
            rel='noopener noreferrer' target="_blank"
          >
            Download Annexure for Research/Academic User
          </NavLink>
        ) : (
          ""
        )}
      </div>
    </>
  );

  const renderGovtOrAcademicUserForm = () => (
    <>
      <div className="mb-2 mx-4">
        <label className="form-label">Employee Type</label>
        <div className="d-flex gap-4">
          <i className="fa-solid fa-address-card fa-2x mt-1" style={{ color: '#1050a2' }}></i>
          <select
            className="form-select"
            required
            name="emptype"
            value={loginData.emptype}
            onChange={handleChange}
          >
            <option>Select</option>
            <option value="Regular Employee">Regular Employee</option>
            <option value="Hired directly on Payroll">
              Hired directly on Payroll
            </option>
          </select>
        </div>
      </div>

      <div className="mb-2 mx-4">
        <label className="form-label">Photo ID Type</label>
        <div className="d-flex gap-4">
          <i className="fa-solid fa-id-badge fa-2x mt-1" style={{ color: '#1050a2' }}></i>
          <select
            className="form-select"
            name="photo_id_type"
            required
            value={loginData.photo_id_type}
            onChange={handleChange}
          >
            <option>Select Photo ID Type</option>
            <option value="Aadhar Card">Aadhar Card</option>
            <option value="PAN Card">PAN Card</option>
            <option value="Voter ID Card">Voter ID Card</option>
          </select>
        </div>
      </div>

      <div className="mb-2 mx-4">
        <label className="form-label">Upload Photo ID Proof</label>
        <div className="d-flex gap-4">
          <i className="fa-solid fa-file-image fa-2x mt-1" style={{ color: '#1050a2' }}></i>
          <input
            type="file"
            className="form-control"
            required
            name="idtype_doc"
            onChange={handleFileChange}
            ref={fileInputRef}
            accept=".jpg,.jpeg,.png,.pdf"
          />
        </div>
      </div>

      <div className="mb-2 mx-4">
        <label className="form-label">Department ID card</label>
        <div className="d-flex gap-4">
          <i className="fa-solid fa-id-card-clip fa-2x mt-1" style={{ color: '#1050a2' }}></i>
          <input
            type="file"
            className="form-control"
            required
            name="usertype_doc"
            onChange={handleFileChange}
            ref={fileInputRef}
            accept=".jpg,.jpeg,.png,.pdf"
          />
        </div>
      </div>

      <div className="mb-2 mx-4">
        <label className="form-label">Upload Annexure</label>
        <div className="d-flex gap-4">
          <i className="fa-solid fa-file-arrow-up fa-2x mt-1" style={{ color: '#1050a2' }}></i>
          <input
            type="file"
            className="form-control"
            required
            name="upload_annexure"
            onChange={handleFileChange}
            ref={fileInputRef}
            accept=".jpg,.jpeg,.png,.pdf"
          />
        </div>
        {loginData.usertype === "Private User" ? (
          <NavLink to="../../policies/private.pdf" className="text-decoration-none" rel='noopener noreferrer' target="_blank" >
            Download Annexure for Private User
          </NavLink>
        ) : loginData.usertype === "Govt User" ? (
          <NavLink to="../../policies/govt.pdf" className="text-decoration-none"
            rel='noopener noreferrer' target="_blank"
          >
            Download Annexure for Govt User
          </NavLink>
        ) : loginData.usertype === "Research/Academic User" ? (
          <NavLink to="../../policies/academic.pdf" className="text-decoration-none"
            rel='noopener noreferrer' target="_blank"
          >
            Download Annexure for Research/Academic User
          </NavLink>
        ) : (
          ""
        )}
      </div>
    </>
  );

  return (
    <HeaderLayout>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container clear">
          <div className="section_heading">
            <h2 className="title_heading">CORS Registration Form</h2>
          </div>
          <h5 className="text-primary" >Personal Information</h5>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-2 mx-4">
                  <label className="form-label">Region</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-earth-asia fa-2x mt-1" style={{ color: '#1050a2' }} ></i>
                    <input
                      type="text"
                      className="form-control"
                      name="region"
                      value={loginData.region}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">Mobile</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-mobile-screen fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="tel"
                      className="form-control"
                      name="mobile_no"
                      value={loginData.mobile_no}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">Name</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-user-tie fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="text"
                      className="form-control"
                      required
                      name="name"
                      value={loginData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">
                    Company/Institute/Organization Name
                  </label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-building fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="text"
                      className="form-control"
                      required
                      name="company_name"
                      value={loginData.company_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">Email</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-envelope fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="email"
                      className="form-control"
                      required
                      name="email"
                      value={loginData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">Address</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-house-user fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="text"
                      className="form-control"
                      required
                      name="address"
                      value={loginData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">District</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-landmark-dome fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="text"
                      className="form-control"
                      required
                      name="district"
                      value={loginData.district}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">State</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-landmark-flag fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <select
                      className="form-select"
                      name="state"
                      required
                      value={loginData.state}
                      onChange={handleChange}
                    >
                      <option>Select State</option>
                      {stateData.map((state, index) => (
                        <option key={index} value={state.id}>
                          {state.state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-2 mx-4">
                  <label className="form-label">Pincode</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-location-dot fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <input
                      type="text"
                      className="form-control"
                      required
                      name="pincode"
                      value={loginData.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-2 mx-4">
                  <label className="form-label">User Type</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-users fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <select
                      className="form-select"
                      name="usertype"
                      required
                      value={loginData.usertype}
                      onChange={handleChange}
                    >
                      <option>Select User Type</option>
                      <option value="Govt User">Government</option>
                      <option value="Research/Academic User">
                        Research/Academic User
                      </option>
                      <option value="Private User">Private</option>
                    </select>
                  </div>
                </div>
                {loginData.usertype === "Private User"
                  ? renderPrivateUserForm()
                  : renderGovtOrAcademicUserForm()}

                <div className="mb-2 mx-4">
                  <label className="form-label">Category</label>
                  <div className="d-flex gap-4">
                    <i className="fa-solid fa-layer-group fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                    <select
                      className="form-select"
                      name="category"
                      required
                      value={loginData.category}
                      onChange={handleChange}
                    >
                      <option>Select Category</option>
                      {categoryData.map((state, index) => (
                        <option key={index} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>


                  </div>
                  
                </div>
                {loginData.category === "others" ?
                  (<div className="mb-2 mx-4">
                    <label className="form-label">Other</label>
                    <div className="d-flex gap-4">
                      <i className="fa-solid fa-user-tie fa-2x mt-1" style={{ color: '#1050a2' }}></i>
                      <input
                        type="text"
                        className="form-control"
                        required
                        name="category_other"
                        value={loginData.category_other}
                        onChange={handleChange}
                      />
                    </div>
                  </div>) : ""}
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn col-md-3 btn-lg"
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
        </div>)}
    </HeaderLayout>
  );


};

export default RegistrationForm;
