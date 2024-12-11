import HeaderLayout from "../components/HeaderLayout"
import "./general-info.css"
import { Link } from 'react-router-dom'

const Faq = () => {
    return (
        <HeaderLayout>
            <div className="container clear">
                <div className="section_heading">
                        <h2 className="title_heading">Frequently asked Questions </h2>
                    </div>
                <div className="accordion accordion-flush w-100  shadow p-3 mb-5 bg-body-tertiary" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                1. In which areas are CORS services available?
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                CORS Services are provided by the Survey of India across India, except in the states of Andhra Pradesh and Tamil Nadu, where these services are offered by respective state governments. 
                                Details of CORS stations can be found at <Link to="https://cors.surveyofindia.gov.in/images/region.jpg" target="_blank">
                                https://cors.surveyofindia.gov.in/images/region.jpg</Link>.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                2. What types of services does SoI CORS offer?
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                SoI offers Real-Time Positioning Services as well as Reference Data Services.
                                Real-Time Positioning provides the location of a point in real-time with a relative positioning accuracy of 3-4 cm.
                                Reference Data Services offers historical data of the installed CORS, and users can process coordinates using the CORS portal.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            3. What are the charges for these services?
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Different services have different subscription charges and their validity. The details of the subscription charges can be found at 
                                <Link to="https://cors.surveyofindia.gov.in/subscription-charges" target="_blank" > https://cors.surveyofindia.gov.in/subscription-charges</Link>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                            4. How to access these services?
                            </button>
                        </h2>
                        <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                To access CORS services, users need to register on the CORS portal. The details of the services and how to register can be found at 
                                <Link to="https://cors.surveyofindia.gov.in/cors-services" target="_blank" >  https://cors.surveyofindia.gov.in/cors-services</Link>.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                            5. How do I register on the CORS website?
                            </button>
                        </h2>
                        <div id="flush-collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                The user can register on the CORS Portal using <Link to="https://cors.surveyofindia.gov.in/registration" target="_blank" > https://cors.surveyofindia.gov.in/registration</Link>.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                                6. How to purchase a subscription for CORS services?
                            </button>
                        </h2>
                        <div id="flush-collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                The user can purchase the subscription using <Link to="https://cors.surveyofindia.gov.in/subscription" target="_blank" > https://cors.surveyofindia.gov.in/subscription</Link>.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                            7. How to register for another region if already registered for one?
                            </button>
                        </h2>
                        <div id="flush-collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Register again for a different region or send an email to <Link to="mailto:cors-grb.soi@gov.in" >cors-grb.soi@gov.in</Link>with user details and the desired region for account transfer.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
                                8. I mistakenly bought a subscription for the wrong region, how do I get it rectified?
                            </button>
                        </h2>
                        <div id="flush-collapseEight" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                You can send an email to <Link to="mailto:cors-grb.soi@gov.in" >cors-grb.soi@gov.in</Link>within one day with details of the acknowledgment number and Bharatkosh receipt.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine">
                            9. How to utilize DGNSS services in my device/GNSS rover instrument?
                            </button>
                        </h2>
                        <div id="flush-collapseNine" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                After successful registration, you have to purchase the subscription for DGNSS in order to use this service. After activation of subscription, you can use the DGNSS service by setting the IP address, Port, username, password and mount point in the rover. 
                                <br />
                                Details of the IP and Port:
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>For Region 1</td>
                                        <td>IP: 103.205.244.106, Port: 2101</td>
                                    </tr>
                                    <tr>
                                        <td>For Region 2</td>
                                        <td>IP: 43.240.5.42, Port: 2105</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTen" aria-expanded="false" aria-controls="flush-collapseTen">
                            10. How to utilize network RTK services in my device/ GNSS rover instrument?
                            </button>
                        </h2>
                        <div id="flush-collapseTen" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                After successful registration, you have to purchase the subscription for DGNSS in order to use this service. After activation of subscription, you can use the DGNSS service by setting the IP address, Port, username, password and mount point in the rover. 
                                <br />
                                Details of the IP and Port:
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>For Region 1</td>
                                        <td>IP: 103.205.244.106, Port: 2101</td>
                                    </tr>
                                    <tr>
                                        <td>For Region 2</td>
                                        <td>IP: 43.240.5.42, Port: 2105</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEleven" aria-expanded="false" aria-controls="flush-collapseEleven">
                        11. How to download CORS station data?
                            </button>
                        </h2>
                        <div id="flush-collapseEleven" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                For downloading of the CORS station data the user needs to login to the CORS web portal using <Link to="http://103.205.244.106/" target="_blank" >http://103.205.244.106/</Link>
                                for Region-1 and <Link to="http://43.240.5.42/sbc/" target="_blank" >http://43.240.5.42/sbc/</Link>for Region-2.
                                SOP for Data downloading can be found at <Link to="https://cors.surveyofindia.gov.in/guidelines" target="_blank" >https://cors.surveyofindia.gov.in/guidelines</Link>.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwelve" aria-expanded="false" aria-controls="flush-collapseTwelve">
                            12. How to download more than 3 months old data?
                            </button>
                        </h2>
                        <div id="flush-collapseTwelve" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Order data up to 3 months old directly on the CORS web portal. For older data, send an email to <Link to="mailto:cors-grb.soi@gov.in" >cors-grb.soi@gov.in</Link>with the CORS station name, duration, and epoch interval. The data will be shared via the FTP portal.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThirteen" aria-expanded="false" aria-controls="flush-collapseThirteen">
                        13. How to get bulk CORS data?
                            </button>
                        </h2>
                        <div id="flush-collapseThirteen" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                For bulk data requirement the user needs to write to <Link to="mailto:cors-grb.soi@gov.in" >cors-grb.soi@gov.in</Link>stating the CORS name, duration, and epoch interval. The data will be shared via the FTP portal.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFourteen" aria-expanded="false" aria-controls="flush-collapseFourteen">
                            14. How to generate Virtual Rinex Data?
                            </button>
                        </h2>
                        <div id="flush-collapseFourteen" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Virtual Rinex Data can be downloaded from the CORS web portal using the Reference Data Shop option.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFifteen" aria-expanded="false" aria-controls="flush-collapseFifteen">
                            15. Whether height given in online processing tool is orthometric/msl height?
                            </button>
                        </h2>
                        <div id="flush-collapseFifteen" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                The height given by online processing tool is Ellipsoidal Height.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSixteen" aria-expanded="false" aria-controls="flush-collapseSixteen">
                                16. How much accuracy I can get form CORS services?
                            </button>
                        </h2>
                        <div id="flush-collapseSixteen" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                The user will get the location of a point with the relative positioning accuracy of 3-4 cm in NRTK mode and 30-40cm in DGNSS mode.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeventeen" aria-expanded="false" aria-controls="flush-collapseSeventeen">
                            17. I have low/no availability of internet in my area of interest, how to use CORS correction services in this region?
                            </button>
                        </h2>
                        <div id="flush-collapseSeventeen" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                For RTK survey availability of the good internet connectivity is must. 
                                In case of non-availability of the internet you can perform the static survey in the field and later on process the coordinate using CORS  Online Processing Tool or offline Post Processing using the nearby CORS stations. 
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEighteen" aria-expanded="false" aria-controls="flush-collapseEighteen">
                            18. RTK corrections are transmitted in which protocol?
                            </button>
                        </h2>
                        <div id="flush-collapseEighteen" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                RTK corrections are being transmitted in NTRIP protocol (Networked Transport of RTCM via Internet Protocol).
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNinteen" aria-expanded="false" aria-controls="flush-collapseNinteen">
                                19. What is region 1 and region 2?
                            </button>
                        </h2>
                        <div id="flush-collapseNinteen" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                CORS services are being disseminated in two regions i.e. Region-1 and Region-2. For details about regions visit 
                                <Link to="https://cors.surveyofindia.gov.in/images/region.jpg" target="_blank" >  https://cors.surveyofindia.gov.in/images/region.jpg</Link>.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwenty" aria-expanded="false" aria-controls="flush-collapseTwenty">
                            20. CORS data is available on which frequency?
                            </button>
                        </h2>
                        <div id="flush-collapseTwenty" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                The CORS data is available in epoch interval of 1sec to 60sec.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwentyone" aria-expanded="false" aria-controls="flush-collapseTwentyone">
                            21. What to do to get higher frequency CORS station static data?
                            </button>
                        </h2>
                        <div id="flush-collapseTwentyone" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                For higher frequency data requirement please contact <Link to="mailto:grb.soi@gov.in"> grb.soi@gov.in </Link>in advance so that another session can be configured on the interested CORS station with the required frequency.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsetwentytwo" aria-expanded="false" aria-controls="flush-collapsetwentytwo">
                            22. What are the reference frame used in CORS network?
                            </button>
                        </h2>
                        <div id="flush-collapsetwentytwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                CORS uses ITRF-2008 with Epoch of 01-01-2005 and datum as WGS84.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-twentythree" aria-expanded="false" aria-controls="flush-twentythree">
                                23. Is it possible to get msl heights from using CORS services?
                            </button>
                        </h2>
                        <div id="flush-twentythree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Yes, it is possible but currently CORS gives only Ellipsoidal height. 
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsetwentyfour" aria-expanded="false" aria-controls="flush-collapsetwentyfour">
                                24. I am not getting sufficient accuracy in RTK.
                            </button>
                        </h2>
                        <div id="flush-collapsetwentyfour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                There might be multiple reasons for not getting the sufficient accuracy. Some of them are non-availability of good internet connection, lack of satellite visibility, high ionospheric activity in the region, etc. 
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                                25. I am not able to download virtual rinex/CORS data.
                            </button>
                        </h2>
                        <div id="flush-collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                If you are unable to download the CORS Data/Virtual Rinex then first check that you have a valid RDS subscriptions or not. If you have the valid subscriptions of RDS then there might be CORS station was down during the period of interest due to internet connectivity or power issues.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsetwentysix" aria-expanded="false" aria-controls="flush-collapsetwentysix">
                                26. When will be CORS services will be available in my state?
                            </button>
                        </h2>
                        <div id="flush-collapsetwentysix" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Survey of India provides CORS Services across India except in the states of Andhra Pradesh and Tamil Nadu, where these services are being offered by respective state governments.
                                For details visit <Link to="https://cors.surveyofindia.gov.in/images/region.jpg" target="_blank" > https://cors.surveyofindia.gov.in/images/region.jpg</Link>.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwentyseven" aria-expanded="false" aria-controls="flush-collapseTwentyseven">
                                27. I am not getting OTP during registration/purchase of subscription.
                            </button>
                        </h2>
                        <div id="flush-collapseTwentyseven" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                If you are not getting OTP within 1 minute then click on the Resend OTP Button. In case you are still not getting the OTP then wait for few hours and try again.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwentyeight" aria-expanded="false" aria-controls="flush-collapseTwentyeight">
                                28. How to get refund for wrong payment/over payment?
                            </button>
                        </h2>
                        <div id="flush-collapseTwentyeight" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Send the email to <Link to="mailto:cors-grb.soi@gov.in" >cors-grb.soi@gov.in</Link>and <Link to="mailto:enao-grb.soi@gov.in" >enao-grb.soi@gov.in</Link>along with the details of the wrong/over payment. 
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwentynine" aria-expanded="false" aria-controls="flush-collapseTwentynine">
                                29. What is acknowledgement id?
                            </button>
                        </h2>
                        <div id="flush-collapseTwentynine" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Acknowledgement number is generated after registration and purchase of subscription for tracking of their status.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThirty" aria-expanded="false" aria-controls="flush-collapseThirty">
                            30. I have been paid money on Bharatkosh portal but receipt is not generated.
                            </button>
                        </h2>
                        <div id="flush-collapseThirty" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Write an email to <Link to="mailto:ntrp-helpdesk@gov.in" >ntrp-helpdesk@gov.in</Link>stating the error received. After receiving the Bharatkosh receipt, upload it to the CORS web portal for assigning of the subscription. 
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThirtyone" aria-expanded="false" aria-controls="flush-collapseThirtyone">
                                31. Where to send Bharatkosh receipt?
                            </button>
                        </h2>
                        <div id="flush-collapseThirtyone" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <Link to="https://cors.surveyofindia.gov.in/subscription" target="_blank" >https://cors.surveyofindia.gov.in/subscription</Link> and after uploading an acknowledgement number is generated. 
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThirtythree" aria-expanded="false" aria-controls="flush-collapseThirtythree">
                                32. My application for registration/subscription has been submitted more than 2 days ago but account has not been created/activated.
                            </button>
                        </h2>
                        <div id="flush-collapseThirtythree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Generally, account/subscription is created within 24 business hour. If there is a public holiday or Saturday/Sunday then it will be activated on the next working day.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThirtyfour" aria-expanded="false" aria-controls="flush-collapseThirtyfour">
                            33. I forgot my password.
                            </button>
                        </h2>
                        <div id="flush-collapseThirtyfour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                You can reset the password using forgot password option on the CORS portal.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThirtyfive" aria-expanded="false" aria-controls="flush-collapseThirtyfive">
                                34. I forgot my user id.
                            </button>
                        </h2>
                        <div id="flush-collapseThirtyfive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                After registration, username and default password has been sent to the registered email and mobile. Please check your inbox for username.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThirtysix" aria-expanded="false" aria-controls="flush-collapseThirtysix">
                            35. Portal is showing mobile number is already registered for CORS services.
                            </button>
                        </h2>
                        <div id="flush-collapseThirtysix" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                You already have a registered account using this number on the CORS Portal.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThirtyseven" aria-expanded="false" aria-controls="flush-collapseThirtyseven">
                            36. Is there any discount for MSME/Start-up?
                            </button>
                        </h2>
                        <div id="flush-collapseThirtyseven" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Currently there is no discount for MSME or Start-up. For latest updates please check CORS portal regularly. 
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThirtyeight" aria-expanded="false" aria-controls="flush-collapseThirtyeight">
                            37. Is there any charge from research fellow/student from non-government universities/research facility?
                            </button>
                        </h2>
                        <div id="flush-collapseThirtyeight" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Yes, the details of the subscription charges can be found at <Link to="https://cors.surveyofindia.gov.in/subscription-charges" target="_blank" >https://cors.surveyofindia.gov.in/subscription-charges</Link>.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThirtyNine" aria-expanded="false" aria-controls="flush-collapseThirtyNine">
                            38. CORS portal is not working.
                            </button>
                        </h2>
                        <div id="flush-collapseThirtyNine" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                There might be some technical issues due to which portal is not working. Please report it to <Link to="mailto:cors-grb.soi@gov.in" >cors-grb.soi@gov.in</Link>for immediate action.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFourty" aria-expanded="false" aria-controls="flush-collapseFourty">
                            39. CORS services are not working.
                            </button>
                        </h2>
                        <div id="flush-collapseFourty" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                            There might be multiple reasons for this. Some of them are non-availability of good internet connection, lack of satellite visibility, high ionospheric activity in the region, etc.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFourtyone" aria-expanded="false" aria-controls="flush-collapseFourtyone">
                            40. I want to connect my GNSS receiver to a Survey of India base station through NTRIP.
                            </button>
                        </h2>
                        <div id="flush-collapseFourtyone" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                In order to access CORS services, you need to register first and then buy a subscription for required services. After that you can connect your GNSS receiver to the CORS Network using the IP address, Port, username and Password.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFourtytwo" aria-expanded="false" aria-controls="flush-collapseFourtytwo">
                            41. How long does it take for the subscription to activate?
                            </button>
                        </h2>
                        <div id="flush-collapseFourtytwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Generally, account/subscription is created within 24 business hour. If there is a public holiday or Saturday/Sunday then it will be activated on the next working day.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFourtythree" aria-expanded="false" aria-controls="flush-collapseFourtythree">
                            42. How to pay for CORS services?
                            </button>
                        </h2>
                        <div id="flush-collapseFourtythree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Payment is to be made on the Bharatkosh Portal using 
                                <Link to="https://bharatkosh.gov.in/NTRPHome/QuickPayment" target="_blank" >https://bharatkosh.gov.in/NTRPHome/QuickPayment</Link>and after payment download the Payment Receipt for uploading on the CORS Portal. 
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFourtyfour" aria-expanded="false" aria-controls="flush-collapseFourtyfour">
                                43. Why there are different mount points?
                            </button>
                        </h2>
                        <div id="flush-collapseFourtyfour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Different mount points give correction using different methodology. You can use the one which suits you the best. 
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFourtyfive" aria-expanded="false" aria-controls="flush-collapseFourtyfive">
                            44. Which mount point RTK corrections should I chose ?
                            </button>
                        </h2>
                        <div id="flush-collapseFourtyfive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Generally, VRS/iMax gives faster results with less initialisation time. However, you are requested to check the different mount points for better suitability in your region. 
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFourtysix" aria-expanded="false" aria-controls="flush-collapseFourtysix">
                            45. How can I get the GST/Tax Invoice?
                            </button>
                        </h2>
                        <div id="flush-collapseFourtysix" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Tax/GST invoice are being sent to registered email address after succesful verification of payment receipt and assigning of subscriptions. 
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFourtyseven" aria-expanded="false" aria-controls="flush-collapseFourtyseven">
                            46. How can I get the GST/Tax Invoice offline?
                            </button>
                        </h2>
                        <div id="flush-collapseFourtyseven" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                For offline Tax/GST invoice the user need to send the email from registered email to cors-grb.soi@gov.in. The invoice will be shared on registered email within 1-2 working days.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HeaderLayout>
    )
}

export default Faq