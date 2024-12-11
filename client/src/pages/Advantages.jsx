import HeaderLayout from "../components/HeaderLayout";
import "./general-info.css";

const Advantages = () => {
  return (
    <HeaderLayout>
      <div className="container clear">
        <div className="row">
          <div className="col-md-12">
            {/* SECTION HEADING START */}
            <div className="section_heading">
              <h2 className="title_heading">Advantages of Network RTK</h2>
            </div>
            {/* SECTION HEADING END */}
            <div className="text-content">
              <p>
                &#11162; &nbsp; &nbsp; No need to purchase and set up a
                reference station.
              </p>
              <p>
                &#11162; &nbsp; &nbsp; The accuracies of the computed rover
                positions are more homogeneous.
              </p>
              <p>
                &#11162; &nbsp; &nbsp; The same area can be covered with fewer
                reference stations (i.e., compared to the number of permanent
                reference stations required using single reference RTK).
              </p>
              <p>
                &#11162; &nbsp; &nbsp; Higher reliability and availability of
                RTK corrections (e.g., one station goes down, another station
                can take over).
              </p>
              <p>
                &#11162; &nbsp; &nbsp; No need to post process and adjust
                reference data to national grid.
              </p>
              <p>
                &#11162; &nbsp; &nbsp; Higher accuracy compared to long baseline
                single RTK.
              </p>
              <p>
                &#11162; &nbsp; &nbsp; Higher productivity of two rovers versus
                one base and one rover.
              </p>
            </div>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Advantages;
