import HeaderLayout from "../components/HeaderLayout"
import "./general-info.css"

const CopyrightPolicy = () => {
  return (
    <HeaderLayout>
         <div className="container clear">
            <div className="section_heading">
                <h2 className="title_heading">Copyright Policy</h2>
            </div>
            <div className="row">
                <div className="col-md-12 text-content clear">
                    <p>Material featured on this site may be reproduced free of charge in any format or media without requiring specific permission. 
                        This is subject to the material being reproduced accurately and not being used in a derogatory manner or in a misleading context. 
                        Where the material is being published or issued to others, the source must be prominently acknowledged.
                    </p>
                    <p>However, the permission to reproduce this material does not extend to any material on this site, which is explicitly identified as being the copyright of a third party.
                        Authorization to reproduce such material must be obtained from the copyright holders concerned.
                    </p>
                </div>
            </div>
        </div>
    </HeaderLayout>
  )
}

export default CopyrightPolicy