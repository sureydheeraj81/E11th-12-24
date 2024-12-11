import HeaderLayout from "../components/HeaderLayout"
import "./general-info.css"

const PrivacyPolicy = () => {
  return (
    <HeaderLayout>
        <div className="container clear">
            <div className="section_heading">
                <h2 className="title_heading">Privacy Policy</h2>
            </div>
            <div className="row">
                <div className="col-md-12 text-content clear">
                    <p>Thanks for visiting website of CORS and reviewing our privacy policy. <br />
                    As a general rule, this website does not collect any Personal Information about you or anyone who visit the site. 
                    Anyone can generally visit the site without revealing Personal Information, unless he chooses to provide such information.
                    </p>
                    <h5 className="content-heading">Site Visit Data</h5>
                    <p>This website records only the following information for statistical purposes  visitor's server address; the name of the top-level domain from which 
                        visitor access the Internet (for eg, .gov, .com, .in, etc.); the type of browser visitor use; the date and time visitor access the site; the pages 
                        visitor have accessed and the documents downloaded and the previous Internet address from which visitor linked directly to the site. 
                        We will not identify users or their browsing activities, except when a law enforcement agency may exercise a warrant to inspect the service provider's logs.
                    </p>
                    <h5 className="content-heading">Cookies</h5>
                    <p>A cookie is a piece of software code that an internet web site sends to visitor's browser when he access information at that site. This site does not use cookies.</p>
                    <h5 className="content-heading">Email Management</h5>
                    <p>Visitor's email address will only be recorded only if he chooses to send a message. 
                        It will only be used for the purpose for which they have provided it and will not be added to a mailing list. 
                        Visitor's email address will not be used for any other purpose, and will not be disclosed, without their consent.
                    </p>
                    <h5 className="content-heading">Collection of Personal Information</h5>
                    <p>If visitors are asked for any other Personal Information they will be informed how it will be used if visitor choose to give it. 
                        If at any time visitor believe the principles referred to in this privacy statement have not been followed, or have any other comments on 
                        these principles, please notify the Web Administrator through the contact us page.<br />
                        <span style={{color:'red'}}>Note: The use of the term "Personal Information" in this privacy statement refers to any information from which your identity is apparent or can be reasonably ascertained.</span>
                    </p>
                </div>
            </div>
        </div>
    </HeaderLayout>
  )
}

export default PrivacyPolicy