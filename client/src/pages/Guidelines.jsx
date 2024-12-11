import { Link } from 'react-router-dom'
import HeaderLayout from '../components/HeaderLayout';

const Guidelines = () => {

  const data = [
    {
      sno:1,
      detail: 'CORS Data Downloading for Region-1',
      to: '/policies/CORS_Data_Downloading_Region-1.pdf'
    },
    {
      sno:2,
      detail: 'VRS Data Downloading for Region-1',
      to: '/policies/VRS_Data_Downloading_Region-1.pdf'
    },
    {
      sno:3,
      detail: 'Online Post Processing for Region-1',
      to: '/policies/Online_Post_Processing-Region-1.pdf'
    },
    {
      sno:4,
      detail: 'CORS Data Downloading for Region-2',
      to: '/policies/CORS_Data_Downloading_Region-2.pdf'
    },
    {
      sno:5,
      detail: 'VRS Data Downloading for Region-2',
      to: '/policies/VRS_Data_Downloading_Region-2.pdf'
    },
    {
      sno:6,
      detail: 'Online Post Processing for Region-2',
      to: '/policies/Online_Post_Processing-Region-2.pdf'
    },
    {
      sno:7,
      detail: 'Guidelines for Network RTK Survey',
      to: '/policies/guidelines-for-network-rtk-survey-7.pdf'
    },
    {
      sno:8,
      detail: 'Model Operating Procedure-1',
      to: '/policies/doc-mop-1-8.pdf'
    },
    {
      sno:9,
      detail: 'Model Operating Procedure-2',
      to: '/policies/doc-mop-2-9.pdf'
    },
    {
      sno:10,
      detail: 'Model Operating Procedure-3',
      to: '/policies/doc-mop-3-10.pdf'
    },
    {
      sno:11,
      detail: 'Model Operating Procedure-4',
      to: '/policies/doc-mop-4-11.pdf'
    },
    {
      sno:12,
      detail: 'Registration SOP',
      to: '/policies/registration_sop.pdf'
    },
    {
      sno:13,
      detail: 'Purchase of CORS Subscription Plans SOP',
      to: '/policies/subscription_sop.pdf'
    },
  ];
  
  return (
    <HeaderLayout>
      <div className="container clear">
      <div className="row">
        <div className="col-md-12">
            {/* SECTION HEADING START */}
            <div className="section_heading">
              <h2 className="title_heading">Guidelines & Operating Procedure</h2>
            </div>
            {/* SECTION HEADING END*/}
            <div className="table-div">
              <table
                className="content-table"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th scope="col">S No.</th>
                    <th scope="col">Description</th>
                    <th scope="col" style={{ width: "18%" }}>
                      Document
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((elem)=> (
                    <tr key={elem.sno}>
                    <td scope="row">{elem.sno}.</td>
                    <td style={{textAlign:'left'}}>
                      <Link
                        to={elem.to}
                        target="_blank"
                        className='content-table-link'
                       rel="noopener noreferrer"
                      >
                        &nbsp; &nbsp;{elem.detail}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={elem.to}
                        target="_blank"
                         className='content-table-link'
                         rel="noopener noreferrer"
                      >
                        <i
                          className="fa-regular fa-file-lines"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
    </HeaderLayout>
  );
};

export default Guidelines;
