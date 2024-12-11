import "./general-info.css"
import {Link} from "react-router-dom"
import "./rti.css"
import HeaderLayout from "../components/HeaderLayout"

const Rti = () => {
  return (
    <HeaderLayout>
        <div className="container clear">
            <div className="section_heading">
                <h2 className="title_heading">Right to Information</h2>
            </div>
            <div className="row">
                <div className="col-md-12 link-box">
                    <Link className="custom-link" to="policies/Identification of Post in SOI(1).pdf" target="_blank">&#11162; &nbsp; Identification of Post in SOI under Disabilities Act -2016</Link><br />
                    <Link className="custom-link" to="/proactive-disclosure">&#11162; &nbsp;  Proactive Disclosure Under Sec-4 RTI Act 2005</Link><br />
                    <Link className="custom-link" to="#" >&#11162; &nbsp;  Citizen Charter</Link><br />
                    <Link className="custom-link" to="#" >&#11162; &nbsp;  Welfare Section</Link><br />
                    <Link className="custom-link" to="#" >&#11162; &nbsp;  Result of Tender</Link><br />
                    <Link className="custom-link" to="#" >&#11162; &nbsp;  Recruitment</Link><br />
                    <Link className="custom-link" to="#" >&#11162; &nbsp;  Application & Appeals</Link><br />
                </div>
            </div>
        </div>
    </HeaderLayout>
  )
}

export default Rti