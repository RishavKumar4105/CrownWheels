import { Link } from "react-router-dom";
import Banner from "../../Movie/carvideo.mp4";
import Cars from "./Cars";
import ViewRating from "../user/ratings/ViewRating";

export default function Home() {

  return (
    <div className="main">
      <>
        <video src={Banner} autoPlay loop muted className="video" />
        <div className="banner_taital_main">
          <h1 className="banner_taital">CrownWheels</h1>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div
                id="banner_slider"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active"></div>
                </div>
              </div>
              <Link
                className="carousel-control-prev"
                to="#banner_slider"
                role="button"
                data-slide="prev"
              >
                <i className="fa fa-angle-left" />
              </Link>
              <Link
                className="carousel-control-next"
                to="#banner_slider"
                role="button"
                data-slide="next"
              >
                <i className="fa fa-angle-right" />
              </Link>
            </div>
          </div>
        </div>

        {/* banner section end */}
        {/* about section start */}
        <div className="about_section layout_padding">
          <div className="container">
            <div className="about_section_2">
              <div className="row">
                <div className="col-md-6">
                  <div className="image_iman">
                    <img src="/assets/images/BMW.png" className="about_img" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="about_taital_box">
                    <h1 className="about_taital">
                      About <span style={{ color: "#416E96" }}>Us</span>
                    </h1>
                    <p className="about_text">
                      Welcome to CrownWheels! We offer an exceptional luxury car
                      rental experience with a premium fleet of high-end
                      vehicles. Whether for special events, business trips, or a
                      taste of luxury, we have the perfect car for you. Our
                      commitment to excellence ensures seamless service,
                      comfort, and style. Explore our personalized rentals,
                      chauffeur services, and more. Thank you for choosing
                      CrownWheels – where luxury meets convenience. Enjoy your
                      journey with us!
                    </p>
                    {/* <div className="readmore_btn">
                      <a href="#">Read More</a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* about section end */}
       
        <Cars isCalled={true}/>
        {/* choose section start */}
        <div className="choose_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="choose_taital">WHY CHOOSE US</h1>
              </div>
            </div>
            <div className="choose_section_2">
              <div className="row">
                <div className="col-sm-4">
                  <div className="icon_1">
                    <img src="/assets/images/icon-1.png" />
                  </div>
                  <h4 className="safety_text">SAFETY &amp; SECURITY</h4>
                  <p className="ipsum_text">
                    At CrownWheels, your safety and security are our top
                    priorities. We ensure that all our luxury vehicles are
                    regularly inspected and maintained to the highest standards.
                    Our cars are equipped with the latest safety features,
                    providing you with peace of mind on the road. Additionally,
                    our secure booking system protects your personal
                    information, ensuring a safe and seamless rental experience.
                  </p>
                </div>
                <div className="col-sm-4">
                  <div className="icon_1">
                    <img src="/assets/images/icon-2.png" />
                  </div>
                  <h4 className="safety_text">Online Booking</h4>
                  <p className="ipsum_text">
                    Experience the convenience of renting a luxury car with just
                    a few clicks. Our user-friendly online booking system allows
                    you to browse our premium fleet, select your preferred
                    vehicle, and complete your reservation in minutes. Whether
                    you're planning ahead or need a last-minute rental, our 24/7
                    online service makes it easy to find the perfect car
                    whenever you need it.
                  </p>
                </div>
                <div className="col-sm-4">
                  <div className="icon_1">
                    <img src="/assets/images/icon-3.png" />
                  </div>
                  <h4 className="safety_text">Best Drivers</h4>
                  <p className="ipsum_text">
                    Our professional drivers are committed to delivering a
                    first-class service. Carefully selected for their
                    experience, expertise, and dedication to customer
                    satisfaction, our drivers ensure a smooth and comfortable
                    ride. Whether you need a chauffeur for a special event or a
                    business trip, you can trust our drivers to provide a safe
                    and luxurious journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* choose section end */}
        <ViewRating calledBy={"Home"}/>
        {/* contact section start */}
        {/* <div className="contact_section layout_padding">
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
                    <input
                      type="text"
                      className="mail_text"
                      placeholder="Name"
                      name="Name"
                    />
                    <input
                      type="text"
                      className="mail_text"
                      placeholder="Email"
                      name="Email"
                    />
                    <input
                      type="text"
                      className="mail_text"
                      placeholder="Phone Number"
                      name="Phone Number"
                    />
                    <textarea
                      className="massage-bt"
                      placeholder="Massage"
                      rows={5}
                      id="comment"
                      name="Massage"
                    />
                    <div className="send_bt">
                      <button type="submit">Send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </>
    </div>
  );
}
