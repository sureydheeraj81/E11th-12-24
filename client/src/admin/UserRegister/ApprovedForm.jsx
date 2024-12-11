import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { acceptedData, updateUser, getRegRejectionReason, stateInfo,getAllMob } from "../../services/Apis"
import toast from 'react-hot-toast';
import Sidebar from '../layout/Sidebar';
import { BACKEND_URL } from "../../services/Helper";

const ApprovedForm = () => {
    const navigate = useNavigate();
    const { sno } = useParams();
    const [reasons, setReason] = useState([])
    const [stateData, setStateData] = useState([])
    const [isMob, setIsEmail] = useState([]);


    const token = localStorage.getItem('token')

    // const adminInfo = JSON.parse(token).id;

    const [formData, setFormData] = useState({
        username: '',
        is_rejected: '',
        password: '',
        rejected_reason: '',
        application_no: '',
        mobile_no: '',
        region: '',
        photo_id_type: '',
        address: '',
        state: '',
        name: '',
        email: '',
        usertype: '',
        company_name: '',
        district: '',
        pincode: '',
        emptype: '',
        category_other: '',
        category: '',
        // adminName: adminInfo,
        rejectDes: ''
    })
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await acceptedData(sno);
                const responseState = await stateInfo();

                const rejectiondata = await getRegRejectionReason();
                const resEmail = await getAllMob();
                setIsEmail(resEmail.data.data);

                setReason(rejectiondata.data.data);
                setFormData(response.data.Data);
                setStateData(responseState.data.data);

            } catch (error) {
                toast.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, [sno]);

    if (formData.is_rejected === "Rejected") {
        const rejdata = reasons.find(item => item.sno == Number(formData.rejected_reason))
        if (rejdata) {
            formData.rejectDes = rejdata.description
        }
    }
    let stateLetter;
    if (formData.state) {
        const rejdata = stateData.find(item => item.id == Number(formData.state))
        if (rejdata) {
            stateLetter = rejdata.state
        }
    }

    const getAndUpdateUser = async (isUpdate = false) => {
        setLoading(true);
        try {
            const isAlreadyRegistered = isMob.some(
                (item) => item.email === formData.email && item.region ===formData.region
              );
          
              if (isAlreadyRegistered) {
                toast.error(`This Email (${formData.email}) is already registered for ${formData.region}!`);
                return;
              }
            const response = await updateUser(
                isUpdate ? formData : {}, sno
            );

            if (response.data.success === true) {
                if (isUpdate) {
                    toast.success(response.data.message);
                    navigate('/admin/dashboard');
                }
            }

        } catch (error) {
            console.log(error)
            toast.error("This mobile number is already approved in this region!!!:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        getAndUpdateUser(true);
    };

    const renderPrivateUserData = () => (
        <div className="row">
            <div className="col-md-6">
                <div className="row mb-3 mx-2">
                    <label className="col-md-3">Username:</label>
                    <div className="col-md-9">
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3 mx-2">
                    <label className="form-label col-md-3">Update Status:</label>
                    <div className="col-md-9">
                        <select
                            className="form-select"
                            name="is_rejected"
                            value={formData.is_rejected}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3 mx-2">
                    <label className="col-md-3">Photo ID Proof:</label>
                    <div className="col-md-9">
                        <Link
                            to={`${BACKEND_URL}/public/users/${formData.idtype_doc}`}
                            target="_blank"
                            className="text-decoration-none"
                        >
                            View Document
                        </Link>
                    </div>
                </div>
                <div className="row mb-3 mx-2">
                    <label className="col-md-3">Annexure:</label>
                    <div className="col-md-9">
                        <Link
                            to={`${BACKEND_URL}/public/users/${formData.upload_annexure}`}
                            target="_blank"
                            className="text-decoration-none"
                        >
                            View Document
                        </Link>
                    </div>
                </div>
                {formData.is_rejected === "Rejected" ? (
                    <div className="row mb-3 mx-2">
                        <label className="form-label col-md-3">Reason:</label>
                        <div className="col-md-9">
                            <select
                                className="form-select"
                                name="rejected_reason"
                                value={formData.rejected_reason}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                {reasons.map((state, index) => (
                                    <option key={index} value={state.sno}>
                                        {state.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>

            <div className="col-md-6">
                <div className="row mb-3 mx-2">
                    <label className="col-md-3">Password:</label>
                    <div className="col-md-9">
                        <input
                            type="text"
                            className="form-control"
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3 mx-2">
                    <label className="col-md-3">Industry Type:</label>


                    {reasons.category === 'others' ? (
                        <div className="col-md-9">
                            <input
                                type="text"
                                className="form-control"
                                value={formData.category_other}
                                name="category_other"
                                onChange={handleChange}
                                readOnly
                            />
                        </div>

                    ) : (<div className="col-md-9">
                        <input
                            type="text"
                            className="form-control"
                            value={formData.category}
                            name="category"
                            onChange={handleChange}
                            readOnly
                        />
                    </div>)}


                </div>
            </div>
        </div>
    );

    const renderGovernmentUserData = () => (
        <div className="row">
            <div className="col-md-6">
                <div className="row mb-3 mx-2">
                    <label className="col-md-3">Username:</label>
                    <div className="col-md-9">
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3 mx-2">
                    <label className="form-label col-md-3">Update Status:</label>
                    <div className="col-md-9">
                        <select
                            className="form-select"
                            name="is_rejected"
                            value={formData.is_rejected}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3 mx-2">
                    <label className="col-md-3">Photo ID Proof:</label>
                    <div className="col-md-9">
                        <Link
                            to={`${BACKEND_URL}/public/users/${formData.idtype_doc}`}
                            className="text-decoration-none"
                            target="_blank"
                        >
                            View Document
                        </Link>
                    </div>
                </div>
                <div className="row mb-3 mx-2">
                    <label className="col-md-3">Annexure:</label>
                    <div className="col-md-9">
                        <Link
                            to={`${BACKEND_URL}/public/users/${formData.upload_annexure}`}
                            className="text-decoration-none"
                            target="_blank"
                        >
                            View Document
                        </Link>
                    </div>
                </div>
                {formData.is_rejected === "Rejected" ? (
                    <div className="row mb-3 mx-2">
                        <label className="form-label col-md-3">Reason:</label>
                        <div className="col-md-9">
                            <select
                                className="form-select"
                                name="rejected_reason"
                                value={formData.rejected_reason}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                {reasons.length > 0 ? (
                                    reasons.map((state, index) => (
                                        <option key={index} value={state.sno}>
                                            {state.description}
                                        </option>
                                    ))) : 0}
                            </select>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>

            <div className="col-md-6">
                <div className="row mb-3 mx-2">
                    <label className="col-md-3">Employee Type:</label>
                    <div className="col-md-9">
                        <input
                            type="text"
                            className="form-control"
                            value={formData.emptype}
                            name="emptype"
                            onChange={handleChange}
                            readOnly
                        />
                    </div>
                </div>
                <div className="row mb-3 mx-2">
                    <label className="col-md-3">Password:</label>
                    <div className="col-md-9">
                        <input
                            type="text"
                            className="form-control"
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3 mx-2">
                    <label className="col-md-3">Industry Type:</label>

                    {formData.category === 'others' ? (
                        <div className="col-md-9">
                            <input
                                type="text"
                                className="form-control"
                                value={formData.category_other}
                                name="category_other"
                                onChange={handleChange}
                                readOnly
                            />
                        </div>

                    ) : (
                        <div className="col-md-9">
                            <input
                                type="text"
                                className="form-control"
                                value={formData.category}
                                name="category"
                                onChange={handleChange}
                                readOnly
                            />
                        </div>)}


                </div>
                <div className="row mb-3 mx-2">
                    <label className="col-md-3">Dep.Id Card:</label>
                    <div className="col-md-9">
                        <Link
                            to={`${BACKEND_URL}/public/users/${formData.usertype_doc}`}
                            className="text-decoration-none"
                            target="_blank"
                        >
                            View Document
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Sidebar>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="clear">
                    <div className="section_heading">
                        {formData.is_rejected === "Pending" ? <h3 className="text-warning mb-4"> Pending</h3> : formData.is_rejected === "Approved" ? <h3 className="text-success mb-4"> Approved</h3> : <h3 className="text-danger mb-4"> Rejected</h3>}

                    </div>
                    <div
                        className="clear"
                        style={{ border: "1px solid grey", borderRadius: "10px" }}
                    >
                        <h3 className="text-success mb-4">{formData.status}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row mb-3 mx-2">
                                        <label className="col-md-3">Application No:</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="application_no"
                                                value={formData.application_no}
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3 mx-2">
                                        <label className="col-md-3">Mobile No:</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="mobile_no"
                                                value={formData.mobile_no}
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3 mx-2 ">
                                        <label className="col-md-3">Region:</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.region}
                                                name="region"
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3 mx-2">
                                        <label className="col-md-3">ID Type:</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.photo_id_type}
                                                name="photo_id_type"
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3 mx-2">
                                        <label className="col-md-3">Address:</label>
                                        <div className="col-md-9">
                                            <textarea
                                                className="form-control"
                                                rows={2}
                                                value={formData.address}
                                                name="address"
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3 mx-2">
                                        <label className="col-md-3">State:</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                // value={formData.state}
                                                value={stateLetter}

                                                name="state"
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row mb-3 mx-2">
                                        <label className="col-md-3">Name:</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.name}
                                                name="name"
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3 mx-2">
                                        <label className="col-md-3">Email ID:</label>
                                        <div className="col-md-9">
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={formData.email}
                                                name="email"
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3 mx-2">
                                        <label className="col-md-3">User Type:</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.usertype}
                                                name="usertype"
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3 mx-2">
                                        <label className="col-md-3">Org Name:</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.company_name}
                                                name="company_name"
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3 mx-2">
                                        <label className="col-md-3">District:</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.district}
                                                name="district"
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3 mx-2">
                                        <label className="col-md-3">Pin Code:</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.pincode}
                                                name="pincode"
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {formData.usertype === "Private User"
                                ? renderPrivateUserData()
                                : renderGovernmentUserData()}
                            <div className="row mx-3">
                                <button type="submit" className="btn btn-success col-md-2">
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary ms-2 col-md-2"
                                    onClick={() => navigate("/admin/dashboard")}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>)}
        </Sidebar>
    );

};

export default ApprovedForm;
















































