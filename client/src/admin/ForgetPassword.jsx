import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminHeader from "./layout/AdminHeader";
import { forgotPassword } from "../services/Apis";

const ForgetPassword = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword({email: email}); 
      if (response.success) {
        toast.success(response.data.message);
        navigate("/admin/login")
      } else {
        toast.error(response.message.message);
      }
    } catch (error) {
      toast.error("Failed to retrieve user details!");
    }
  };
  return (
    <>
      <AdminHeader />
      <div className="container mt-4">
      <div className="row justify-content-center align-items-center mx-1">
        <div className="col-lg-5 col-md-8 col-sm-10 p-4 rounded shadow">
          <section className="text-center mt-2">
            <i className="fa-solid fa-user-tie fa-2x text-primary"></i>
            <h3 className="mb-4">Forget Password</h3>
          </section>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your registered email"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Reset Password
            </button>
          </form>
          <div className="text-center mt-3">
            <Link to="/admin/login" className="text-decoration-none">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      </div>
      <div
        className="d-flex justify-content-center align-items-center text-white p-1 small position-absolute w-100 bottom-0"
        style={{
          backgroundColor: "#002147",
        }}
      >
        <div>
          &copy; {currentYear} CORS | Survey of India | All rights reseved.
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
