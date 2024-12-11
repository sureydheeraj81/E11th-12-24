import HeaderLayout from "../components/HeaderLayout";
import "./general-info.css";

const Abbreviations = () => {
  return (
    <HeaderLayout>
      <div className="container clear">
        <div className="row">
          <div className="col-md-12">
            {/* SECTION HEADING START  */}
            <div className="section_heading">
              <h2 className="title_heading">Some Abbreviations and Definitions</h2>
            </div>
            {/* SECTION HEADING END */}
            <div className="text-content">
              <p>
                <strong style={{color:'#1050a2'}}>
                  CORS (Continuously Operating Reference Station) -{" "}
                </strong>
                An installation of GNSS receiver that is precisely located and
                continuously observing GNSS data. Arrays of CORS are often
                linked together as part of a network to deliver precise
                positioning solutions over large areas.
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>DGNSS Differential GNSS - </strong>A basic method of
                processing GNSS data to achieve submeter level accuracies (often
                referred to as DGPS).
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>GNSS (Global Navigation Satellite System) - </strong>A
                global network of satellites producing navigation signals for
                positioning and navigation applications on earth.
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>VRS (Virtual Reference Station) - </strong>A method of
                NRTK which generates virtual data from data collected at nearby
                CORS for a specified location.
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>MAC (Master Auxiliary Concept) - </strong>A method of
                NRTK which provides CORS data with correction parameters
                generated from nearby CORS in order to optimise the solution for
                a specified location.
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>NRTK Network RTK - </strong>An enhancement of RTK which
                utilises data from multiple CORS to provide a uniform level of
                accuracy across the network.
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>
                  NTRIP (Networked Transport of RTCM via Internet Protocol) -{" "}
                </strong>
                A method for streaming RTCM messages over the internet.
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>RINEX Receiver Independent Exchange - </strong>An
                international standard for the storage of GNSS data.
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>
                  RTCM (Radio Technical Commission for Maritime) Services -
                </strong>
                An international standard for real-time data streaming of GNSS
                data.
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>RTK (Real Time Kinematic) - </strong> A sophisticated
                method of processing GNSS data to achieve centimetre level
                accuracies in real time.
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>APC - </strong>Antenna Phase Center
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>ARP - </strong>Antenna Reference Point
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>CSRS-PPP - </strong>Online Precise Point Positioning
                (PPP) Service
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>GDOP - </strong>Geometric Dilution of Precision
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>GLONASS - </strong>Globalnaya Navigatsionnaya
                Sputnikovaya Sistema or Russian Global Navigation Satellite
                System
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>GNSS - </strong>Global Navigation Satellite System
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>GPS - </strong>Global Positioning System
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>HI - </strong>Height of Instrument. In RTK this refers
                to the distance from the physical point to the Antenna Reference
                Point (ARP)
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>HPN - </strong>Provincial High Precision Networks
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>NAD83 - </strong>North American Datum 1983
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>PDOP - </strong>Positional Dilution of Precision
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>RINEX - </strong>The Receiver Independent Exchange
                Format
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>RTK - </strong>Real-Time Kinematic
              </p>
              <p>
                <strong style={{color:'#1050a2'}}>RTN - </strong>Real-Time Network
              </p>
            </div>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Abbreviations;
