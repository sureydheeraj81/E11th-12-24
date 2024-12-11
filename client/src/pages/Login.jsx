import { Link } from "react-router-dom";
import HeaderLayout from "../components/HeaderLayout";
import "./login.css";

const Login = () => {
  return (
    <>
      <HeaderLayout>
        <div className="container clear">
          <div className="section_heading mb-0">
            <h2 className="title_heading">Log In</h2>
          </div>
          <div className="row">
            <div className="col-md-6 login-btn-box">
              <div className="login-btn-box">
                <Link to="http://103.205.244.106/" target="_blank">
                  <button className="btn btn-md region-btn">
                    Click here to Sign in to Region-1
                  </button>
                </Link>
              </div>
              <div className="login-btn-box">
                <Link
                  to="http://43.240.5.42/sbc/Account/Index?returnUrl=%2Fsbc"
                  target="_blank"
                >
                  <button className="btn btn-md region-btn">
                    Click here to Sign in to Region-2
                  </button>
                </Link>
              </div>
              <div className="login-btn-box">
                <Link
                  className="login-link"
                  to="/images/region.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here to know your Region
                </Link>
                <br />
                <Link
                  className="login-link"
                  to=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here to know the Availability of CORS Services
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="region-img">
                <img
                  className="img-fluid w-100 d-md-block"
                  src="/images/region.jpg"
                  alt="region"
                  style={{ maxWidth: "500px", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </HeaderLayout>
    </>
  );
};

export default Login;
