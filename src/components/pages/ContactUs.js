import { Link } from "react-router-dom";

export default function ContactUs(){
    return(
        <div className="main">
        <>
  { /* header section end */ }
  <div className="call_text_main">
     <div className="container">
        <div className="call_taital">
           <div className="call_text"><Link to="#"><i className="fa fa-map-marker" aria-hidden="true" /><span className="padding_left_15">Location</span></Link></div>
           <div className="call_text"><Link to="#"><i className="fa fa-phone" aria-hidden="true" /><span className="padding_left_15">(+71) 8522369417</span></Link></div>
           <div className="call_text"><Link to="#"><i className="fa fa-envelope" aria-hidden="true" /><span className="padding_left_15">demo@gmail.com</span></Link></div>
        </div>
     </div>
  </div>
  { /* contact section start */ }
  <div className="contact_section layout_padding">
     <div className="container">
        <div className="row">
           <div className="col-sm-12">
              <h1 className="contact_taital">Get In Touch</h1>
           </div>
        </div>
     </div>
     <div className="container">
        <div className="contact_section_2">
           <div className="row">
              <div className="col-md-12">
                 <div className="mail_section_1">
                    <input type="text" className="mail_text" placeholder="Name" name="Name" />
                    <input type="text" className="mail_text" placeholder="Email" name="Email" />
                    <input type="text" className="mail_text" placeholder="Phone Number" name="Phone Number" />
                    <textarea className="massage-bt" placeholder="Massage" rows={5} id="comment" name="Massage" />
                    <div className="send_bt"><Link href="#">Send</Link></div>
                 </div>
              </div>
           </div>
        </div>
     </div>
  </div>
  { /* contact section end */ }
  { /* footer section start */ }
 </>
    </div>
    )
}