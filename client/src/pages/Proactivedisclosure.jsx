import HeaderLayout from "../components/HeaderLayout"
import "./general-info.css"
import "./rti.css"

const ProactiveDisclosure = () => {
  return (
    <HeaderLayout>
       <div className="container clear">
            <div className="section_heading">
                <h2 className="title_heading">Proactive Disclosure Under Sec-4 RTI Act 2005</h2>
            </div>
            <div className="row">
                <div className="col-md-12 link-box">
                    <a className="custom-link" href="policies/rti-act-2005-hindi.pdf" target="_blank">&#11162; &nbsp; &nbsp; RTI Act-2005 Manual</a> <br />
                    <a className="custom-link" href="policies/coi-updated-as-31-07-2018.pdf" target="_blank">&#11162; &nbsp; &nbsp; Constitution of India</a> <br />
                    <a className="custom-link" href="policies/coi-hindi.pdf" target="_blank">&#11162; &nbsp; &nbsp; भारत का संविधान</a> <br />
                    <a className="custom-link" href="policies/goi-web-guidelines.pdf" target="_blank">&#11162; &nbsp; &nbsp; Guidelines for Govt Website</a> <br />
                    <a className="custom-link" href="policies/TP Report.pdf" target="_blank">&#11162; &nbsp; &nbsp; Transparency Aduit Report 2021-22</a> <br />
                </div>
            </div>
        </div>
    </HeaderLayout>
  )
}

export default ProactiveDisclosure