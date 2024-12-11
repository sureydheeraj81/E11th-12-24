import HeaderLayout from "../components/HeaderLayout";
import "./general-info.css";

const Usages = () => {
  return (
    <HeaderLayout>
      <div className="container clear">
        <div className="row">
          <div className="col-md-12">
            {/* SECTION HEADING START */}
            <div className="section_heading">
              <h2 className="title_heading">Usages</h2>
            </div>
            {/* SECTION HEADING END */}
            <div className="text-content">
              <p>
                SOI CORS Network provides access to a stable, national
                coordinate reference system (via GNSS data). It enables
                Real-time Kinematic (RTK) positioning services, which are ideal
                for surveying, construction and precision agricultural
                applications. SOI CORS Network can deliver efficiencies within a
                variety of market sectors including agriculture, construction,
                surveying and asset management. You can save time and money and
                complete more jobs during the working day. The data can be
                available to all users using a common coordinate reference
                system.
              </p>
              <h5 className="content-heading">Agriculture</h5>
              <p>
                When used for the precise positioning of farm machinery, SOI
                CORS Network can be used to improve crop yields. You can plan
                and manage seed sowing more precisely for instance, to create
                less waste and reduce costs.
              </p>
              <h5 className="content-heading">Construction</h5>
              <p>
                SOI CORS Network can be used for machine control on construction
                sites. This creates efficiencies by increasing the accuracy of
                the work, cutting fuel use and reducing operator error.
              </p>
              <h5 className="content-heading">Surveying</h5>
              <p>
                SOI CORS Network is used for land monitoring, building and
                setting out, among other types of surveying. Initialisation is
                faster and there is no need for a base station or another pair
                of hands.
              </p>
              <h5 className="content-heading">Accurate asset management</h5>
              <p>
                Companies in the energy and infrastructure sector use SOI CORS
                Network to map their buried services precisely. This saves time
                in relocation and enables repairs to be carried out quickly and
                efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Usages;
