import HeaderLayout from "../components/HeaderLayout";
import "./general-info.css";

const Requirements = () => {
  return (
    <HeaderLayout>
      <div className="container clear">
        <div className="row">
          <div className="col-md-12">
            {/* SECTION HEADING START */}
            <div className="section_heading">
              <h2 className="title_heading">Requirements At User End</h2>
            </div>
            {/* SECTION HEADING END */}
            <div className="text-content">
              <p>
                &#11162; &nbsp; &nbsp; User must be equipped with RTK enabled
                GNSS receivers.
              </p>
              <p>
                &#11162; &nbsp; &nbsp; Ensure communication and RTK/RTN
                corrections are available throughout project area.
              </p>
              <p>&#11162; &nbsp; &nbsp; Elevation Mask of 10-15 degrees.</p>
              <p>
                &#11162; &nbsp; &nbsp; Minimum number of tracked satellites set
                to six.
              </p>
              <p>
                &#11162; &nbsp; &nbsp; Use mission planning software to
                determine optimal survey times.
              </p>
              <p>
                &#11162; &nbsp; &nbsp; Use latest firmware recommended by the
                manufacturer.
              </p>
              <p>&#11162; &nbsp; &nbsp; Use only FIXED solutions.</p>
              <p>
                &#11162; &nbsp; &nbsp; Set receiver QC value to slightly less
                than project accuracy requirement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Requirements;
