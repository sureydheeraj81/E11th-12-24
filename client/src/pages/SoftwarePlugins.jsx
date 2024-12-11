import HeaderLayout from "../components/HeaderLayout"
import "./general-info.css"
import './rti.css'

const SoftwarePlugins = () => {
  return (
    <HeaderLayout>
        <div className="container clear">
            <div className="section_heading">
                <h2 className="title_heading">Software & Plug-ins</h2>
            </div>
            <div className="row">
                <div className="col-md-12 text-content">
                    <p>The information provided by this Web site is available in various file formats, such as Portable Document Format (PDF),
                        Word, Excel and PowerPoint. To view the information properly, your browser need to have the required plug-ins or software.
                        For example, the Adobe Flash software is required to view the Flash files. In case your system does not have this software,
                        you can download it from the Internet for free. The table lists the required plug-ins needed to view the information in various file formats.</p>
                    <p>Note: To view Microsoft Office 2007 files, install the Microsoft Office Compatibility Pack along with the respective viewer.</p>
                    <h5 className="content-heading">Plug-in for alternate document types: </h5>
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>Document Type</th>
                                <th>Plug-in for Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Portable Document Format (PDF) files</td>
                                <td>
                                    <p><a className="custom-ref" href="https://get.adobe.com/uk/reader/" target="_blank">Adobe Acrobat Reader (External website that opens in a new window)</a></p>
                                    <p><a className="custom-ref" href="https://www.adobe.com/acrobat/features.html" target="_blank">Convert a PDF file online into HTML or text format (External website that opens in a new window)</a></p>
                                </td>
                            </tr>
                            <tr>
                                <td>Word files</td>
                                <td>
                                    <p><a className="custom-ref" href="https://www.microsoft.com/en-us/download/" target="_blank">Word Viewer (in any version till 2003) - External website that opens in a new window</a></p>
                                    <p><a className="custom-ref" href="https://www.microsoft.com/en-us/download/" target="_blank">Microsoft Office Compatibility Pack for Word (for 2007 version) - External website that opens in a new window</a></p>
                                </td>
                            </tr>
                            <tr>
                                <td>Excel files</td>
                                <td>
                                    <p><a className="custom-ref" href="https://www.microsoft.com/en-us/download/" target="_blank">Excel Viewer 2003 (in any version till 2003) - External website that opens in a new window</a></p>
                                    <p><a className="custom-ref" href="https://www.microsoft.com/en-us/download/" target="_blank">Microsoft Office Compatibility Pack for Excel (for 2007 version) - External website that opens in a new window</a></p>
                                </td>
                            </tr>
                            <tr>
                                <td>PowerPoint presentations</td>
                                <td>
                                    <p><a className="custom-ref" href="https://www.microsoft.com/en-us/download/" target="_blank">PowerPoint Viewer 2003 (in any version till 2003) - External website that opens in a new window</a></p>
                                    <p><a className="custom-ref" href="https://www.microsoft.com/en-us/download/" target="_blank">Microsoft Office Compatibility Pack for PowerPoint (for 2007 version) - External website that opens in a new window</a></p>
                                </td>
                            </tr>
                            <tr>
                                <td>Flash content</td>
                                <td>
                                    <p><a className="custom-ref" href="https://www.adobe.com/products/flashplayer/end-of-life.html" target="_blank">Adobe Flash Player (External website that opens in a new window)</a></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </HeaderLayout>
  )
}

export default SoftwarePlugins