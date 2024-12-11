import { useState, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import "../admin/styles/profile.css";
import { useLocation, useNavigate } from "react-router-dom";
import { updateAdminProfile } from "../services/Apis";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null); // Preview image
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    sno: 0,
    full_name: "",
    mobile: "",
    email: "",
    designation: "",
    gender: "male",
    username: "",
    usertype: "",
    profilePic: "",
  });

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); 
      setImageFile(file); 

      setFormData((prevData) => ({
        ...prevData,
        profilePic: imageUrl, 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();

      Object.keys(formData).forEach((key) => {
        formDataWithImage.append(key, formData[key]);
      });

      if (imageFile) {
        formDataWithImage.append("profilePic", imageFile);
      }
      console.log(formDataWithImage);

      let response = await updateAdminProfile(formDataWithImage);
      if (response.success) {
        toast.success(response.data.message);
        window.history.back();
      } else {
        toast.error(response.message.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in admin profile updation");
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  useEffect(() => {
    if (location.state) {
      setFormData({
        sno: location.state.sno,
        full_name: location.state.full_name,
        mobile: location.state.mobile,
        email: location.state.email,
        designation: location.state.designation,
        gender: location.state.gender,
        username: location.state.username,
        usertype: location.state.usertype,
        profilePic: location.state.profilePic,
      });
      setProfileImage(`/${location.state.profilePic}`); 
    }
  }, [location.state]);

  return (
    <>
      <Sidebar>
        <div className="clear">
          <div className="section_heading">
            <h2 className="title_heading">Update Profile</h2>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="col-md-6 border rounded mb-4 p-2">
              <div className="d-flex justify-content-center">
                <div className="admin-img-div text-center mb-3 position-relative">
                  <img
                    src={profileImage || "/public/uploads/profile.png"}
                    alt="Admin"
                    className="admin-img"
                  />
                  <label htmlFor="image-upload" className="image-upload-label">
                    <i className="fa-solid fa-camera camera-icon"></i>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="image-upload-input"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="plan-form">
                {/* Name */}
                <div className="form-group row mt-2">
                  <label className="col-md-4 col-form-label">Name:</label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      name="full_name"
                      onChange={handleInputChange}
                      required
                      value={formData.full_name}
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div className="form-group row mt-2">
                  <label className="col-md-4 col-form-label">Mobile:</label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      name="mobile"
                      maxLength="10"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-group row mt-2">
                  <label className="col-md-4 col-form-label">Email:</label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      readOnly
                    />
                  </div>
                </div>

                {/* Designation */}
                <div className="form-group row mt-2">
                  <label className="col-md-4 col-form-label">Designation:</label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="form-group row mt-2">
                  <label className="col-md-4 col-form-label">Gender:</label>
                  <div className="col-md-8">
                    <select
                      name="gender"
                      className="form-control"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Username (Readonly) */}
                <div className="form-group row mt-2">
                  <label className="col-md-4 col-form-label">Username:</label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      readOnly
                    />
                  </div>
                </div>

                {/* Usertype (Readonly) */}
                <div className="form-group row mt-2">
                  <label className="col-md-4 col-form-label">Usertype:</label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      name="usertype"
                      value={formData.usertype}
                      onChange={handleInputChange}
                      required
                      readOnly
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="mt-4 text-center">
                  <button
                    type="submit"
                    className="btn btn-success col-md-3 me-2"
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-danger col-md-3"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default UpdateProfile;


// import { useState, useEffect } from "react";
// import Sidebar from "./layout/Sidebar";
// import "../admin/styles/profile.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { updateAdminProfile } from "../services/Apis";
// import toast from "react-hot-toast";

// const UpdateProfile = () => {

//   const location = useLocation();
//   const navigate = useNavigate();
//   const [passwordOption, setPasswordOption] = useState("No");
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmNewPassword: "",
//   });

//   const [profileImage, setProfileImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [formData, setFormData] = useState({
//     sno: 0,
//     full_name: "",
//     mobile: "",
//     email: "",
//     designation: "",
//     gender: "male",
//     username: "",
//     usertype: "",
//     profilePic: "",
//   });

//   const handleInputChange = (e) => {
//     // const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl);
//       setImageFile(file);
//     }
//   };

//   // Handle input changes for password fields
//   const handlePasswordChange = (e) => {
//     setPasswordData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate password fields if changing password
//     if (passwordOption === "Yes") {
//       const { currentPassword, newPassword, confirmNewPassword } = passwordData;
//       if (!currentPassword || !newPassword || !confirmNewPassword) {
//         toast.warning("All password fields are required!");
//         return;
//       }
//       if (newPassword !== confirmNewPassword) {
//         toast.error("New password and confirm password do not match!");
//         return;
//       }
//     }
//     // Simulate form submission
//     console.log("Profile updated:", formData);
//     if (passwordOption === "Yes") {
//       console.log("Password updated:", passwordData);
//     }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let response = await updateAdminProfile(formData);
//       if (response.success) {
//         toast.success(response.data.message);
//         window.history.back();
//       } else {
//         toast.error(response.message.message);
//       }
//     } catch (error) {
//       toast.error("Error in admin profile updation");
//     }
//   };

//   const handleCancel = () => {
//     window.history.back();
//   };

//   useEffect(() => {
//     if (location.state) {
//       setFormData({
//         sno: location.state.sno,
//         full_name: location.state.full_name,
//         mobile: location.state.mobile,
//         email: location.state.email,
//         designation: location.state.designation,
//         gender: location.state.gender,
//         username: location.state.username,
//         usertype: location.state.usertype,
//         profilePic: location.state.profilePic,
//       });
//     }
//   }, [location.state]);
//   return (
//     <>
//       <Sidebar>
//         <div className="clear">
//           <div className="section_heading">
//             <h2 className="title_heading">Update Profile</h2>
//           </div>
//           <div className="d-flex justify-content-center align-items-center">
//             <div className="col-md-6 border rounded mb-4 p-2">
//               <div className="d-flex justify-content-center">
//                 <div className="admin-img-div text-center mb-3 position-relative">
//                   <img
//                     src={
//                       formData.profilePic
//                         ? `/${formData.profilePic}`
//                         : "/public/uploads/profile.png"
//                     }
//                     alt="Admin"
//                     className="admin-img"
//                   />
//                   <label htmlFor="image-upload" className="image-upload-label">
//                     <i className="fa-solid fa-camera camera-icon"></i>
//                   </label>
//                   <input
//                     id="image-upload"
//                     type="file"
//                     accept="image/*"
//                     className="image-upload-input"
//                     onChange={handleImageChange}
//                   />
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="plan-form">
//                 {/* Name */}
//                 <div className="form-group row mt-2">
//                   <label className="col-md-3 col-form-label">Name:</label>
//                   <div className="col-md-9">
//                     <input
//                       className="form-control"
//                       type="text"
//                       name="full_name"
//                       onChange={handleInputChange}
//                       required
//                       value={formData.full_name}
//                     />
//                   </div>
//                 </div>

//                 {/* Mobile */}
//                 <div className="form-group row mt-2">
//                   <label className="col-md-3 col-form-label">Mobile:</label>
//                   <div className="col-md-9">
//                     <input
//                       className="form-control"
//                       type="text"
//                       name="mobile"
//                       maxLength="10"
//                       value={formData.mobile}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="form-group row mt-2">
//                   <label className="col-md-3 col-form-label">Email:</label>
//                   <div className="col-md-9">
//                     <input
//                       className="form-control"
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                       readOnly
//                     />
//                   </div>
//                 </div>

//                 {/* Designation */}
//                 <div className="form-group row mt-2">
//                   <label className="col-md-3 col-form-label">
//                     Designation:
//                   </label>
//                   <div className="col-md-9">
//                     <input
//                       className="form-control"
//                       type="text"
//                       name="designation"
//                       value={formData.designation}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Gender */}
//                 <div className="form-group row mt-2">
//                   <label className="col-md-3 col-form-label">Gender:</label>
//                   <div className="col-md-9">
//                     <select
//                       name="gender"
//                       className="form-control"
//                       value={formData.gender}
//                       onChange={handleInputChange}
//                     >
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Username (Readonly) */}
//                 <div className="form-group row mt-2">
//                   <label className="col-md-3 col-form-label">Username:</label>
//                   <div className="col-md-9">
//                     <input
//                       className="form-control"
//                       type="text"
//                       name="username"
//                       value={formData.username}
//                       onChange={handleInputChange}
//                       required
//                       readOnly
//                     />
//                   </div>
//                 </div>

//                 {/* Usertype (Readonly) */}
//                 <div className="form-group row mt-2">
//                   <label className="col-md-3 col-form-label">Usertype:</label>
//                   <div className="col-md-9">
//                     <input
//                       className="form-control"
//                       type="text"
//                       name="usertype"
//                       value={formData.usertype}
//                       onChange={handleInputChange}
//                       required
//                       readOnly
//                     />
//                   </div>
//                 </div>

//                 {/* Change Password */}
//                 <div className="form-group row mt-3">
//                   <label className="col-md-3 col-form-label">
//                     Change Password:
//                   </label>
//                   <div className="col-md-9">
//                     <select
//                       className="form-control"
//                       value={passwordOption}
//                       onChange={(e) => setPasswordOption(e.target.value)}
//                     >
//                       <option value="No">No</option>
//                       <option value="Yes">Yes</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Password Fields */}
//                 {passwordOption === "Yes" && (
//                   <>
//                     <div className="form-group row mt-3">
//                       <label className="col-md-3 col-form-label">
//                         Current Password:
//                       </label>
//                       <div className="col-md-9">
//                         <input
//                           type="password"
//                           className="form-control"
//                           name="currentPassword"
//                           value={passwordData.currentPassword}
//                           onChange={handlePasswordChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="form-group row mt-3">
//                       <label className="col-md-3 col-form-label">
//                         New Password:
//                       </label>
//                       <div className="col-md-9">
//                         <input
//                           type="password"
//                           className="form-control"
//                           name="newPassword"
//                           value={passwordData.newPassword}
//                           onChange={handlePasswordChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="form-group row mt-3">
//                       <label className="col-md-3 col-form-label">
//                         Confirm Password:
//                       </label>
//                       <div className="col-md-9">
//                         <input
//                           type="password"
//                           className="form-control"
//                           name="confirmNewPassword"
//                           value={passwordData.confirmNewPassword}
//                           onChange={handlePasswordChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                   </>
//                 )}

//                 {/* Submit button */}
//                 <div className="mt-4 text-center">
//                   <button
//                     type="submit"
//                     className="btn btn-success col-md-3 me-2"
//                   >
//                     Submit
//                   </button>
//                   <button
//                     className="btn btn-danger col-md-3"
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </Sidebar>
//     </>
//   );
// };

// export default UpdateProfile;
