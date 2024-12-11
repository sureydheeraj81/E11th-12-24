import React from 'react'
import HeaderLayout from '../components/HeaderLayout'

const AccessbilityStatement = () => {
  return (
    <HeaderLayout>
        <div className="container clear">
            <div className="section_heading">
                <h2 className="title_heading">Accessbility Statement</h2>
            </div>
            <div className="row">
                <div className="col-md-12 text-content clear">
                    <p style={{marginLeft:'25px'}}>We are committed to ensure that the CORS website is accessible to all users irrespective of device in use, technology, or ability.
                        It has been built, with an aim, to provide maximum accessibility and usability to its visitors. As a result, this website can be viewed
                        from a variety of devices such as Desktop / Laptop computers, web-enabled mobile devices; wap phones; PDAs, etc.
                    </p>
                    <p style={{marginLeft:'25px'}}>We also aim to be standards compliant and follow principles of usability and universal design, which should help all visitors of this website. <br />
                        This website is designed using HTML 5 Transitional to meet Guidelines for Indian Government Websites and also adheres to Level AA of the Web
                        Content Accessibility Guidelines (WCAG) 2.0 laid down by the World Wide Web Consortium (W3C).
                        Part of the information on the website is also made available through links to external Websites.
                        External Websites are maintained by the respective departments who are responsible for making these sites accessible.
                    </p>
                </div>
            </div>
        </div>
    </HeaderLayout>
  )
}

export default AccessbilityStatement