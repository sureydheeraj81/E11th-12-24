import HeaderLayout from "../components/HeaderLayout";
import "./general-info.css";

const Connectionsettings = () => {
  return (
    <HeaderLayout>
      <div className="container clear">
        <div className="row">
          <div className="col-md-12">
            {/* SECTION HEADING START */}
            <div className="section_heading">
              <h2 className="title_heading">Connection Settings</h2>
            </div>
            {/* SECTION HEADING END */}
            <div className="text-content">
              <h5 style={{ color: "#1050a2" }}>To connect you will need:</h5>
              <ul>
                <li> &nbsp; &nbsp; Username and password,</li>
                <li> &nbsp; &nbsp; Internet access,</li>
                <li> &nbsp; &nbsp; Connection details:</li>
              </ul>
              <br />
              <h5 style={{ color: "#1050a2", fontWeight: "700" }}>
                IP address and port:
              </h5>
              {/* <table style="font-weight:600;">
                                <tr>
                                    <td>For Region 1</td>
                                    <td>103.205.244.106 Port: 2101</td>
                                </tr>
                                <tr>
                                    <td>For Region 2</td>
                                    <td>43.240.5.42 Port: 2105</td>
                                </tr>
                            </table> */}
              <p>
                <b style={{ color: "#1050a2" }}>For Region 1:</b>&nbsp;&nbsp;IP:
                103.205.244.106, Port: 2101
              </p>
              <p>
                <b style={{ color: "#1050a2" }}>For Region 2:</b>&nbsp;&nbsp;IP:
                43.240.5.42, Port: 2105
              </p>
              <p>
                <strong>
                  If you connect to our NTRIP server through Mobile
                  Telecommunications Services, please check the APN setting with
                  service provider.
                </strong>
              </p>
              <p>
                Mountpoint: A mount point relates to a real-time data stream
                option. When connecting to CORS in realtime, a mount point list
                is usually generated for a user to select from.
              </p>
              <p>&#x2022; &nbsp; &nbsp; VRS</p>
              <p>&#x2022; &nbsp; &nbsp; MAC/iMAX</p>
              <p>&#x2022; &nbsp; &nbsp; FKP</p>
              <p>&#x2022; &nbsp; &nbsp; DGNSS</p>
              <br />
              <p>
                <strong style={{ color: "#1050a2" }}>
                  VRS Network RTK mount point :
                </strong>{" "}
                This will provide a network RTK data stream in Virtual Reference
                Station (VRS) format (RTCM Format v3.2).
              </p>
              <p>
                <strong style={{ color: "#1050a2" }}>
                  MAC Network RTK mount point :{" "}
                </strong>{" "}
                This will provide a network RTK data stream in Master Auxiliary
                Concept (MAC) format(RTCM Format v3.1).
              </p>
              <p>
                <strong style={{ color: "#1050a2" }}>
                  FKP RTK mount point :{" "}
                </strong>{" "}
                This will provide a network RTK data stream in Flachen Korrektur
                Parameter (FKP) format(RTCM Format v3.1).
              </p>
              <p>
                <strong style={{ color: "#1050a2" }}>
                  DGNSS mount point :{" "}
                </strong>{" "}
                This will provide a sub metre differential solution optimised
                for the user's location(RTCM Format v2.4).
              </p>
              <br />
              <p>
                It is important to ensure that your equipment settings match the
                particular mount point you intend to use. For those who have not
                used a network solution before, it looks and feels, in a
                practical sense, like a single base solution. Field procedures
                should remain the same, particularly in relation to performing
                site calibrations. However reliability and integrity of Network
                solutions are much better than single base solutions. For
                reference of Users Model Operating Procedures and and Guidelines
                for using Network RTK are available in Download Page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Connectionsettings;
