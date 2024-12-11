import React from 'react'
import "./contactus.css"
import HeaderLayout from '../components/HeaderLayout'

const ContactUs = () => {
  return (
    <HeaderLayout>
      <div className="container clear">
        <div className="row">
          <div className="col-md-12">
            <div className="city_about_list">
              <div className="section_heading">
                <h2 className="title_heading">Contact Details</h2>
              </div>
              <div className="city_about_text contact-dets">
              <h5 style={{color:"#ffffff"}}>For more information or assistance, <br />  Please contact CORS Customer Support at :</h5>
              <p style={{color:"#ffffff"}}> <i className="fa-solid fa-square-phone"></i> Phone : 0135-2975366, 0135-2713296</p>
              <p style={{color:"#ffffff"}}><i className="fab fa-whatsapp"></i> WhatsApp Helpline: +91-9410197247</p>
              <p style={{color:"#ffffff"}}><i className="fa-solid fa-envelope"></i> Email : cors-grb.soi@gov.in</p>
            </div>
          </div>
        </div>
      </div>
    </div >
    </HeaderLayout>
  )
}

export default ContactUs



