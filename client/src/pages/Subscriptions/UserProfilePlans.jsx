import React, { useEffect, useState } from "react";
import { useLocation, useNavigate,Link} from "react-router-dom";
import "../general-info.css";
import HeaderLayout from "../../components/HeaderLayout";
import toast from "react-hot-toast";


function UserProfilePlans() {
  const navigate = useNavigate()
  const location = useLocation();
  const { cartItems, sendCorsPlan, grandTotal, totalGST, totalSubscriptionCharges } = location.state || {};
  const [userData, setUserData] = useState({
    name: "",
    state_id: "",
    address: "",
    email: "",
    region: "",
    userId: "",
    pinCode: "",
    mobile: "",
    company: "",
    user_reg_id: ""
  });

  const restricNav = ( grandTotal) => {
    if (!grandTotal) navigate('/subscription')
  }
  

  useEffect(() => {
    restricNav(grandTotal)

    const savedUserData = localStorage.getItem("userProfile");
    if (savedUserData) {
      try {
        const parsedUserData = JSON.parse(savedUserData);
        setUserData({
          name: parsedUserData.name ,
          state_id: parsedUserData.state ,
          address: parsedUserData.address ,
          email: parsedUserData.email ,
          region: parsedUserData.region ,
          userId: parsedUserData.username ,
          pinCode: parsedUserData.pincode ,
          mobile: parsedUserData.mobile_no ,
          company: parsedUserData.company_name ,
          user_reg_id: parsedUserData.sno 


        

        });
      } catch (error) {
        toast.error("Error parsing user profile data from localStorage:", error);
      }
    }
  }, [grandTotal, cartItems,totalSubscriptionCharges]);

  const handlePayment=()=>{
    navigate('/pay-bharat', {state: {grandTotal}}) 
  }


  

  const handleDataSend = () => {
    navigate('/subscription1/selectP', { state: { userData, cartItems, sendCorsPlan, grandTotal, totalGST, totalSubscriptionCharges } })
  }
  return (
    <HeaderLayout>
    <div className="container clear">
      <div className="section_heading">
        <h2 className="title_heading">CORS Subscription Plan</h2>
      </div>
      <h5 className="mt-4">User Profile</h5>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{userData.name}</td>
            <td><strong>Region:</strong></td>
            <td>{userData.region}</td>
            <td><strong>User Id:</strong></td>
            <td>{userData.userId}</td>
          </tr>
          <tr>
            <td><strong>State:</strong></td>
            <td>{userData.state_id}</td>
            <td><strong>Pin Code:</strong></td>
            <td colSpan={'4'}>{userData.pinCode}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td colSpan={'5'}>{userData.address}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{userData.email}</td>
            <td><strong>Mobile:</strong></td>
            <td>{userData.mobile}</td>
            <td><strong>Company:</strong></td>
            <td>{userData.company}</td>
          </tr>
        </tbody>
      </table>

      <h5 className="mt-4">Selected Subscription Plan</h5>
      <table className="content-table mb-4">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Plan</th>
            <th style={{ textAlign: "justify" }}>Description</th>
            <th style={{ width: '12%' }}>Subscription Charges</th>
            <th style={{ width: '12%' }}>GST</th>
            <th style={{ width: '12%' }}>Total</th>
          </tr>
        </thead>
        <tbody>

       
          {cartItems.length > 0 ?
          (cartItems.map((plan, index) => (
            <tr key={plan.id}>
              <td>{index + 1}</td>
              <td>{plan.cors_plan}</td>
              <td style={{ textAlign: "justify" }}>{plan.cors_description}</td>
              <td>₹{" "}{plan.subscription_charges.toFixed(2)}</td>
              <td>₹{" "}{plan.GST_amt.toFixed(2)}</td>
              <td>₹{" "}{(plan.subscription_charges + plan.GST_amt).toFixed(2)}</td>
            </tr>
          ))):
          <td colspan="6" className="text-center">
          No data available
        </td>}
          <tr className="fw-bold" style={{ background: '#1050a2', color: '#fff' }}>
            <td colspan="3">Total Subscription Plan Amount</td>
            <td>₹{" "}{totalSubscriptionCharges.toFixed(2)}</td>
            <td>₹{" "}{totalGST.toFixed(2)}</td>
            <td>₹{" "}{grandTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div className="alert alert-danger">
         <Link className="text-decoration-none text-danger" to={'https://bharatkosh.gov.in/NTRPHome/QuickPayment'} target="_blank">
          Click here to Pay Rs. {grandTotal.toFixed(2)} on Bharat Kosh Portal using Supply of Geodetic Data purpose
        </Link> 
        {/* <div className="text-decoration-none text-danger" onClick={handlePayment} target="_blank">
          Click here to Pay Rs. {grandTotal.toFixed(2)} on Bharat Kosh Portal using Supply of Geodetic Data purpose
        </div> */}
      </div>

      <div className="alert alert-warning">
        <p>
          Select <strong>037 - SCIENCE AND TECHNOLOGY</strong> as Ministry/Department,
          <strong>Supply of Geodetic Data</strong> as Purpose and <strong>258381 - Geodetic & Research Branch Office, Dehradun</strong> as Drawing & Disbursing Officer (DDO) while making payment on <strong>Bharatkosh Portal</strong>
        </p>
      </div>

      <div className="text-success fw-bold text-center mb-3">
        <button type="button" className="btn col-md-4"
          style={{
            background:
              "radial-gradient(circle at 10% 20%, rgb(7, 121, 222) 0%, rgb(20, 72, 140) 90%)",
            color: "#fff",
          }}
          data-bs-toggle="modal" data-bs-target="#termsModal">
          Please accept Terms and Conditions to Continue!
        </button>
      </div>

      <div className="modal fade" id="termsModal" tabIndex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="termsModalLabel">Terms and Conditions for CORS Website</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div style={{ overflowX: 'auto', height: '70vh', fontSize:"15px", margin: "",paddingRight:"10px" }}>
                <br />
                <p align="justify">
                  1. Contents on this website is published, managed and maintained by Survey of India
                  ("SoI"). Though all efforts have been made to ensure the accuracy and currency of the
                  content on this website, the same should not be construed as a statement of law or used
                  for any legal purposes. In case of any ambiguity or doubts, users are advised to verify
                  / check with the Department(s) and / or other source(s), and to obtain appropriate
                  professional advice.
                </p>
                <p align="justify">
                  2. The Terms and Conditions contained herein shall apply to any person or entity
                  ("User") using the Survey of India CORS website and their products and services. Each
                  user, in their personal or representative capacity, is therefore deemed to have read and
                  accepted these Terms and Conditions. The agreement shall remain valid until it is
                  replaced by another agreement or terminated by Survey of India, whichever is earlier.
                </p>
                <p align="justify">
                  3. Any information that is freely available or accessible in the public domain or
                  furnished under the Right to Information Act, 2005, or any other law for the time being
                  in force shall not be regarded as sensitive personal data or information for the
                  purposes of these acts/rules. RTI Act, Sec 8.1. is applicable in relation to
                  confidentiality and privacy of information indicating that there shall be no obligation
                  to give any citizen any information as covered under the act.
                </p>
                <p align="justify">
                  <b>A. Privacy Policy</b><br />
                  4. Survey of India respects and protects the privacy and confidentiality of information
                  of individuals and entities. Reasonable security practices and procedures are adopted by
                  Survey of India which means security practices and procedures designed to protect
                  information from unauthorized access, damage, use, modification, disclosure or
                  impairment are in place.
                </p>
                <p align="justify">
                  5. By using the CORS services in SoI's websites, the User authorizes SoI to access third
                  party sites, including that of Banks and other payment gateways, designated by User or
                  on their behalf for retrieving requested information.
                </p>
                <p align="justify">
                  <b>B. General Terms and Conditions </b><br />
                  6. Once a user has accepted these Terms and Conditions in a personal or representative
                  capacity, he/ she may register and avail the CORS Products and Services.
                </p>
                <p align="justify">7. All rights and liabilities of the User and/or SoI with respect to any
                  services to be provided by SoI shall be restricted to the scope of this agreement.
                </p>
                <p align="justify">8. The User represent and confirm that the User is of legal age to enter
                  into a binding contract and is not a person barred from availing the Services under “the
                  Guidelines for acquiring and producing Geospatial Data and Geospatial Data Services
                  including Maps” or under “National Geospatial Policy” or any other applicable law of
                  India.
                </p>
                <p align="justify">9. SoI will also not be responsible for screening, censoring or otherwise
                  controlling transactions, including whether the transaction is legal and valid as per
                  the laws of the land of the User.
                </p>
                <p align="justify">10. The User warrants that they will abide by all such additional
                  procedures and guidelines, as modified from time to time, in connection with the use of
                  the services. The User further warrants that they will comply with all applicable laws
                  and regulations regarding use of the services with respect to the jurisdiction concerned
                  for each transaction.
                </p>
                <p align="justify">11. SoI reserves the right, in its sole discretion, to terminate the
                  access to any or all SoI websites or its related services or any portion thereof at any
                  time, without notice, for general maintenance or any reason what so ever.
                </p>
                <p align="justify">12. In addition to this Agreement, there are certain terms of service
                  (TOS) specific to the services rendered/ products provided by SoI like the Network RTK,
                  DGNSS, Online Processing etc. Such TOS will be provided/ updated by SoI on respective
                  webpage, which shall be deemed to be a part of this Agreement and in the event of a
                  conflict between such TOS and this Agreement, the terms of this Agreement shall prevail.
                  The User shall be required to read and accept the relevant TOS for the service/ product
                  availed by the User.
                </p>
                <p align="justify">13. SoI's Services are offered to the User conditioned on acceptance
                  without modification of all the terms, conditions and notices contained in this
                  Agreement and the TOS, as may be applicable from time to time. For the removal of
                  doubts, it is clarified that availing of the Services by the User constitutes an
                  acknowledgement and acceptance by the User of this Agreement and the TOS. If the User
                  does not agree with any part of such terms, conditions and notices, the User must not
                  avail SoI's Services.
                </p>
                <p align="justify">14. In the event that any of the terms, conditions, and notices contained
                  herein conflict with the Additional Terms or other terms and guidelines contained within
                  any other SoI document, then these terms shall control.
                </p>
                <p align="justify">15. Survey of India's rights, obligations, undertakings shall be subject
                  to the laws in force in India, as well as any directives/ procedures of the Government
                  of India, and nothing contained in these Terms and Conditions shall be in derogation of
                  Survey of India's right to comply with any law enforcement agencies request or
                  requirements relating to any User’s use of the website or information provided to or
                  gathered by Survey of India with respect to such use. Each User accepts and agrees that
                  the provision of details of his/ her use of the Website to regulators or police or to
                  any other third party in order to resolve disputes or complaints which relate to the
                  Website shall be at the absolute discretion of Survey of India.
                </p>
                <p align="justify">16. If any part of these Terms and Conditions are determined to be
                  invalid or unenforceable pursuant to applicable law including, but not limited to, the
                  warranty disclaimers and liability limitations set forth herein, then the invalid or
                  unenforceable provision will be deemed superseded by a valid, enforceable provision that
                  most closely matches the intent of the original provision and the remainder of these
                  Terms and Conditions shall continue in effect.
                </p>
                <p align="justify">17. These Terms and Conditions constitute the entire agreement between
                  the user and Survey of India. These Terms and Conditions supersede all prior or
                  contemporaneous communications and proposals, whether electronic, oral, or written,
                  between the user and Survey of India.
                </p>
                <p align="justify">18. The user agrees that under no circumstances the Survey of India shall
                  be held responsible for any fraudulent/duplicate transactions and hence no claims should
                  be raised to Survey of India. No communication received by the Survey of India in this
                  regard shall be entertained.
                </p>
                <p align="justify">19. SoI reserves the right to charge Subscription fees for certain or all
                  services. SoI further reserves the right to alter any and all fees from time to time,
                  without notice.
                </p>
                <p align="justify">20. The User shall be completely responsible for all charges, fees,
                  duties, taxes, and assessments arising out of the use of the services.
                </p>
                <p align="justify">21. In case, there is a short charging by SoI for services or any other
                  fee because of any technical or other reason, it reserves the right to
                  deduct/charge/claim the balance subsequent to the transaction at its own discretion or
                  raise additional demand for short charge while holding services.
                </p>
                <p align="justify">22. SoI is not under any obligation to make another subscription or
                  extend its tenure, in lieu of or to compensate / replace the unutilized subscription due
                  to any reason. All subsequent further subscription will be treated as new transactions
                  with no reference to the earlier unutilized subscription.
                </p>
                <p align="justify">23. Refund for Charge Back Claim: Survey of India as a policy matter,
                  does not entertain any sort of chargeback claims barring few exceptional cases of
                  genuine refunds. In the event there is any claim for/ of chargeback by the User for any
                  reason whatsoever, such user shall immediately approach the Survey of India with his/
                  her claim details and claim a refund.
                </p>
                <p align="justify">24. Refund for fraudulent/duplicate transaction(s): The User shall
                  directly contact the issuing bank for any fraudulent transaction(s) on account of misuse
                  of Card/ Bank details by a fraudulent individual/party and such issues shall be suitably
                  addressed in accordance with the law of the land. For duplicate payment, a refund may be
                  considered by Survey of India through PAO, who on verification of details and other
                  facts will refund the money based on recommendations of related DDO.
                </p>
                <p align="justify">25. SoI is responsible only for the transactions that are done by the
                  User through SoI portals. SoI will not be responsible for transaction made at Bharatkosh
                  portal or payment gateway provided by Bharatkosh portal.
                </p>
                <p align="justify">26. In addition to above clauses Terms and conditions regarding payment,
                  refund etc. of the NTRP i.e., Bharatkosh portal will also be applicable.

                </p>
                <p align="justify"><b>C. Limitation of Liability</b><br />
                </p>
                <p align="justify">27. None of the provisions of any agreement, terms and conditions,
                  notices, or the right to use this website by the User contained herein or any other
                  section or pages of SoI Websites or its partner websites, shall be deemed to constitute
                  a partnership between the User and SoI and no party shall have any authority to bind or
                  shall be deemed to be the agent of the other in any way.
                </p>
                <p align="justify">28. Survey of India shall not be liable for any inaccuracy, error or
                  delay in, or omission of (a) any data, information or message, or (b) the transmission
                  or delivery of any such data, information or message; or (c) any loss or damage arising
                  from or occasioned by any such inaccuracy, error, delay or omission, non-performance or
                  interruption in any such data, information or message.
                </p>
                <p align="justify">29. Survey of India assumes no liability whatsoever for any monetary or
                  other damage suffered by the User on account of:
                  (i) The delay, failure, interruption, or corruption of any data or other information
                  transmitted in connection with use of the CORS products and services
                  (ii) Neither Survey of India nor any associated third parties provide any warranty or
                  guarantee as to the timeliness, performance, completion which may arise due to technical
                  reasons beyond our control.
                </p>
                <p align="justify">30. Survey of India shall not be liable for delay in performing or
                  failure to perform any of its obligations under these Terms of Service (Terms &amp;
                  Conditions) which is caused by circumstances beyond its reasonable control, including,
                  but not limited to, the failure, malfunction or unavailability of telecommunications,
                  data communications and computer systems and services, natural calamities, war, civil
                  unrest, government action, strikes, lock-outs or other industrial action or trade
                  disputes. Any delay or failure of this kind will not be deemed to be a breach of the
                  Terms of Service (Terms &amp; Conditions) and the time for performance of the affected
                  obligation will be extended by a period that is reasonable in the circumstances.
                </p>
                <p align="justify">31. The User understands and agrees that any material and/or data
                  downloaded or otherwise obtained through the use of the Service is done entirely at
                  their own discretion and risk and they will be solely responsible for any damage to
                  their computer systems or loss of data that results from the download of such material
                  and/or data.
                </p>
                <p align="justify">32. Nevertheless, SoI will always make its best endeavours to ensure that
                  the content on its websites or other information channels are free of any virus or such
                  other malwares.

                </p>
                <p><b>D. Indemnity:</b>
                </p>
                <p align="justify">33. The User agrees to indemnify, hold harmless and defend Survey of
                  India and its affiliates against any loss and damages that may be caused from or
                  relating to
                  a. Breach of Terms of Service (Terms &amp; Conditions) mentioned herein.
                  b. Improper use of the Survey of India services by the User.
                  c. Any claims made by third parties arising from issues related to any failure, delay or
                  interruption of the services facilitated by Survey of India.
                  d. The use of Survey of India Continuously Operating Reference Station in any manner
                  which violates the Terms of Service (Terms &amp; Conditions) or otherwise violates any
                  law, rule, conditions, or regulation.

                </p>
                <p align="justify"><b>E. Right to Refuse</b>
                </p>
                <p align="justify">34. SoI at its sole discretion reserves the right to not to accept any
                  customer order without assigning any reason thereof. Any contract to provide any service
                  by SoI is not complete until full money towards the service is received from the
                  customer and accepted by SoI.
                </p>
                <p align="justify">35. Without prejudice to the other remedies available to SoI under this
                  agreement, the TOS or under applicable law, SoI may limit the user's activity, or end
                  the user's subscription, warn other users of the user's actions, immediately
                  temporarily/indefinitely suspend or terminate the user's registration, and/or refuse to
                  provide the user with access to the website if:
                  a. The user is in breach of this agreement, the TOS and/or the documents it incorporates
                  by reference;
                  b. SoI is unable to verify or authenticate any information provided by the user; or
                  c. SoI believes that the user's actions may infringe on any third-party rights or breach
                  any applicable law or otherwise result in any liability for the user, other users of the
                  website and/or SoI.
                </p>
                <p align="justify">36. SoI may at any time in its sole discretion reinstate suspended users.
                  Once the user has been indefinitely suspended the user shall not register or attempt to
                  register with SoI or use the website in any manner whatsoever until such time that the
                  user is reinstated by SoI.
                </p>
                <p align="justify">37. Notwithstanding the foregoing, if the user breaches this agreement,
                  the TOS or the documents it incorporates by reference, SoI reserves the right to recover
                  any amounts due and owing by the user to SoI and to take strict legal action as SoI
                  deems necessary.
                </p>
                <p align="justify">38. The User expressly undertakes to provide to SoI only correct and
                  valid information while requesting for any services under this agreement, and not to
                  make any misrepresentation of facts at all. Any default on part of the User would
                  vitiate this agreement and shall disentitle the User from availing the services from
                  SoI.
                </p>
                <p align="justify">39. In case SoI discovers or has reasons to believe at any time during or
                  after receiving a request for services from the User that the request for services is
                  either unauthorized or the information provided by the User or any of them is not
                  correct or that any fact has been misrepresented by him, SoI in its sole discretion
                  shall have the unrestricted right to take any steps against the User(s), including
                  cancellation of the subscription and/or registration, etc. without any prior intimation
                  to the User. In such an event, SoI shall not be responsible or liable for any loss or
                  damage that may be caused to the User or any of them as a consequence of such
                  cancellation of booking or services.
                </p>
                <p align="justify">40. The User unequivocally indemnifies SoI of any such claim or liability
                  and shall not hold SoI responsible for any loss or damage arising out of measures taken
                  by SoI for safeguarding its own interest and that of its genuine customers. This would
                  also include SoI denying/cancelling any subscription on account of suspected fraud
                  transactions.
                </p>
                <p><b>F. Miscellaneous Conditions:</b>
                </p>
                <p align="justify">41. Any waiver of any rights available to Survey of India under these
                  Terms and Conditions shall not mean that those rights are automatically waived. Survey
                  of India reserves discretionary powers to amend or supplement any of the Terms of
                  Service (Terms &amp; Conditions) at any time, without prior notice.
                </p>
                <p align="justify">42. User acknowledges that SoI provides services with reasonable
                  diligence and care. It endeavors its best to ensure that User does not face any
                  inconvenience. However, at some times, the information, software, products, and services
                  included in or available through the SoI websites may include inaccuracies or
                  typographical errors which will be immediately corrected as soon as SoI notices them.
                  Changes are/may be periodically made/added to the information provided such. SoI may
                  make improvements and/or changes in the SoI websites at any time without any notice to
                  the User. Any advice received except through an authorized representative of SoI via the
                  SoI websites or its official email id, should not be relied upon for any decisions.
                </p>
                <p align="justify">43. The User agrees, understands, and confirms that his/ her personal
                  information transmitted over the Internet may be susceptible to misuse, hacking, theft,
                  and/ or fraud and that Survey of India has no control over such matters.
                </p>
                <p align="justify">44. Although all reasonable care has been taken towards guarding against
                  unauthorized use of any information transmitted by the User, Survey of India does not
                  represent or guarantee that the use of the Services provided by/ through it will not
                  result in theft and/or unauthorized use of data over the Internet.
                </p>
                <p align="justify">45. The User will receive a system-generated user id and password after
                  registration in order to use the Services provided by Survey of India. By accepting
                  these Terms and Conditions the User agrees that his/ her User ID and Password are very
                  important pieces of information and it shall be the User’s own responsibility to keep
                  them secure and confidential. In furtherance hereof, the User agrees to;
                  (i) Users are required to change the default password for security reason
                  (ii) Choose a new password, whenever required for security reasons.
                  (iii) Keep his/ her User ID &amp; Password strictly confidential.
                  (iv) Be responsible for any transactions made by the User under such User ID and
                  Password.
                </p>
                <p align="justify">46. The User is fully responsible for all activities that occur while
                  using their password or account. It is the duty of the User to notify SoI immediately in
                  writing of any unauthorized use of their password or account or any other breach of
                  security. SoI will not be liable for any loss that may be incurred by the User as a
                  result of unauthorized use of his password or account, either with or without his
                  knowledge. The User shall not use anyone else's password at any time.

                </p>
                <p align="justify"><b>F. Personal Information</b>
                </p>
                <p align="justify">47. The User agrees that, to the extent required or permitted by law,
                  Survey of India may also collect, use and disclose personal information in connection
                  with security related or law enforcement investigations or in the course of cooperating
                  with authorities or complying with legal requirements.
                </p>
                <p align="justify">48. The User agrees that any communication sent by the User vide e-mail
                  or mobile, shall imply release of information therein/ therewith to Survey of India. The
                  User agrees to be contacted via e-mail or mobile initiated by him/ her.
                </p>
                <p align="justify">49. In addition to the information already in the possession, Survey of
                  India may have collected similar information from the User in the past. By entering the
                  Website the User consents to the terms of Survey of India’s information privacy policy
                  and to Survey of India’s continued use of previously collected information. By
                  submitting the User’s personal information to Survey of India, the User will be treated
                  as having given his/her permission for the processing of the User’s personal data as set
                  out herein.
                </p>
                <p align="justify">50. The User acknowledges and agrees that his/ her information will be
                  managed in accordance with the laws of the land for the time in force.
                </p>
                <p align="justify">51. SoI may send subscription confirmation &amp; subscription
                  tenure/usage information &amp; update the customer on the service unavailability status
                  and any further information via SMS (short messaging service) on the mobile number given
                  by the customer at the time of registration. The customer hereby unconditionally
                  consents such intimation via SMS by SoI in accordance with the 'Do not disturb'
                  guidelines of Telecom Regulatory Authority of India (TRAI) or such other authority in
                  India and abroad.
                </p>
                <p><b>G. Disclaimer</b>
                </p>
                <p align="justify">52. This website contains material that is owned by or licensed to us.
                  This material includes, but is not limited to, the design, layout, look, appearance and
                  graphics. Reproduction is prohibited other than in accordance with the copyright notice,
                  which forms part of these terms and conditions.
                </p>
                <p align="justify">53. All trademarks reproduced in this website that are not the property
                  of, or licensed to, the operator is acknowledged on the website. From time to time this
                  website may also include links to other websites. These links are provided for your
                  convenience to provide further information. They do not signify that we endorse the
                  website(s). We have no responsibility for the content of the linked website(s).
                </p>
                <p align="justify">54. By accepting/ agreeing to these Terms and Conditions, the User
                  expressly agrees that his/ her use of the aforesaid CORS services is entirely at own
                  risk and responsibility of the User.
                  &emsp;</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Reject</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDataSend}>Accept Terms and Conditions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </HeaderLayout>
  );
 
}

export default UserProfilePlans;
