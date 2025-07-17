import { Link } from "react-router-dom";

// import React from "react";
export default function About(){
    return(
        <div className="py-4">
      <div className="call_text_main">
         <div className="container">
            <div className="call_taital">
               <div className="call_text"><Link to="#"><i className="fa fa-map-marker" aria-hidden="true" /><span className="padding_left_15">Location</span></Link></div>
               <div className="call_text"><Link to="#"><i className="fa fa-phone" aria-hidden="true" /><span className="padding_left_15">(+71) 8522369417</span></Link></div>
               <div className="call_text"><Link to="#"><i className="fa fa-envelope" aria-hidden="true" /><span className="padding_left_15">demo@gmail.com</span></Link></div>
            </div>
         </div>
      </div>
      { /* about section start */ }
      <div className="about_section layout_padding">
         <div className="container">
            <div className="about_section_2">
               <div className="row">
                  <div className="col-md-6"> 
                     <div className="image_iman"><img src="/assets/images/BMW.png" className="about_img" /></div>
                  </div>
                  <div className="col-md-6"> 
                     <div className="about_taital_box">
                        <h1 className="about_taital">About <span style={{ color: "#416E96" }}>Us</span></h1>
                        <p className="about_text">Welcome to LuxRyRides! We offer an exceptional luxury car rental experience with a premium fleet of high-end vehicles. 
                    Whether for special events, business trips, or a taste of luxury, we have the perfect car for you.
                     Our commitment to excellence ensures seamless service, comfort, and style. Explore our personalized rentals, chauffeur services, and more. 
                     Thank you for choosing LuxRyRides – where luxury meets convenience. Enjoy your journey with us!</p>
                        {/* <div className="readmore_btn"><Link to="#">Read More</Link></div> */}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      { /* about section end */ }
      { /* footer section start */ }
      
        </div>
    )
    }
