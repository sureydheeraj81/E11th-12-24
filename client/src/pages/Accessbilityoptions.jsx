import HeaderLayout from '../components/HeaderLayout'
import './general-info.css'

const AccessbilityOptions = () => {
  return (
    <HeaderLayout>
        <div className="container clear">
            <div className="section_heading">
                <h2 className='title_heading'>Accessbility Options</h2>
            </div>
            <div className="row">
                <div className="col-md-12 text-content clear">
                    <p style={{marginLeft:'25px'}}>&#11162; &nbsp; You may customize this site for a better reading experience.</p>
                    <p style={{marginLeft:'25px'}}>&#11162; &nbsp; You will also know what percentage of zoom you are currently on.</p>
                    <p style={{marginLeft:'25px'}}>&#11162; &nbsp; For your convenience, your preferences will remain for any page you visit on this site until you change it by simply going back 
                        to this page, setting the page style back to standard and then clicking the Text Size in the header.
                    </p>
                    <p style={{marginLeft:'25px'}}>&#11162; &nbsp; Also, you will notice in your browser, no matter which one you use, you will have additional options in your toolbar view menu for
                        the page style background and text color combinations. So you have a choice of choosing your preferences from this accessibility page or from your own
                        browser toolbar menu under view. Your hot keys may depend on what browser you are using. For example, if you are using Mozilla Firefox or Internet Explorer
                        you may go to Alt + V (for view) and type the letter "Y" for Page Style. You will see the four background and text color combinations available for you 
                        to choose. You will also see "No Style". That always was an option in your browser and when you choose this, it strips all style and graphics, leaving 
                        only text and links. That is nothing additional that we added. So if you have experimented with color combinations and want to get back to the standard 
                        style of this site, do not choose "No style" from your browser. Choose "standard" either from your browser or this page.
                    </p>
                </div>
            </div>
        </div>
    </HeaderLayout>
  )
}

export default AccessbilityOptions