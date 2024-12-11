import HeaderLayout from "../components/HeaderLayout";
import "./general-info.css";

const Videotutorial = () => {
  return (
    <HeaderLayout>
      <div className="container clear">
        <div className="row">
          <div className="col-md-12">
            {/* SECTION HEADING START */}
            <div className="section_heading">
              <h2 className="title_heading">Video Tutorials</h2>
            </div>
            {/* SECTION HEADING END */}
            <div className="city_about_text" style={{ marginTop: "30px" }}>
              <div className="row clear">
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-10 video-bg">
                  <iframe
                    width="100%"
                    height="210"
                    style={{ borderRadius: "10px" }}
                    src="https://www.youtube.com/embed/wmE2VljYQNU"
                    title="CORS Data Downloading UPUKHR"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p>
                    <strong>CORS Data Downloading UPUKHR</strong>
                  </p>
                  <br />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-10">
                  <iframe
                    width="100%"
                    height="210"
                    style={{ borderRadius: "10px" }}
                    src="https://www.youtube.com/embed/aFrVftgt_Dg"
                    title="VRS Data Downloading UPUKHR"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p>
                    <strong>VRS Data Downloading UPUKHR</strong>
                  </p>
                  <br />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-10">
                  <iframe
                    width="100%"
                    height="210"
                    style={{ borderRadius: "10px" }}
                    src="https://www.youtube.com/embed/FQcZadx8LrY"
                    title="RTK Field Observation Setting using R8s"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p>
                    <strong>RTK Field Observation Setting using R8s</strong>
                  </p>
                  <br />
                </div>
              </div>
              <div className="row clear">
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-10">
                  <iframe
                    width="100%"
                    height="210"
                    style={{ borderRadius: "10px" }}
                    src="https://www.youtube.com/embed/pQ1FPYP5h34"
                    title="Online Coordinate Computation MH KK"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p>
                    <strong>Online Coordinate Computation MHKK</strong>
                  </p>
                  <br />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-10">
                  <iframe
                    width="100%"
                    height="210"
                    style={{ borderRadius: "10px" }}
                    src="https://www.youtube.com/embed/KEX-x08terY"
                    title="CORS Data Downloading MH KK"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p>
                    <strong>CORS Data Downloading MHKK</strong>
                  </p>
                  <br />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-10">
                  <iframe
                    width="100%"
                    height="210"
                    style={{ borderRadius: "10px" }}
                    src="https://www.youtube.com/embed/RxAiXs8-WNc"
                    title="Virtual Rinex Data Downloading MH KK"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p>
                    <strong>Virtual Rinex Data Downloading MHKK</strong>
                  </p>
                  <br />
                </div>
              </div>
              <div className="row clear">
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-10">
                  <iframe
                    width="100%"
                    height="210"
                    style={{ borderRadius: "10px" }}
                    src="https://www.youtube.com/embed/PFwv_jTmiQw"
                    title="Online Coordinate Computation UPUKHR"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p>
                    <strong>Online Coordinate Computation UPUKHR</strong>
                  </p>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Videotutorial;
