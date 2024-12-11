import HeaderLayout from '../components/HeaderLayout'
import './general-info.css'

const HyperlinkingPolicy = () => {
  return (
    <HeaderLayout>
        <div className="container clear">
            <div className="section_heading">
                <h2 className="title_heading">Hyperlinking Policy</h2>
            </div>
            <div className="row">
                <div className="col-md-12 text-content clear">
                    <p>We do not object to you linking directly to the information that is hosted on our site and no prior permission is required for the same. 
                        However, we would like you to inform us about any links provided to our site so that you can be informed of any changes or updations therein. 
                        Also, we do not permit our pages to be loaded into frames on your site. Our Department's pages must load into a newly opened browser window of the user.
                    </p>
                </div>
            </div>
        </div>
    </HeaderLayout>
  )
}

export default HyperlinkingPolicy