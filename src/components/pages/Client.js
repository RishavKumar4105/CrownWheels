import { Link } from "react-router-dom";
export default function Client() {
  return (
    <div className="main">
      <>
        <div className="client_section layout_padding">
          <div className="container">
            <div
              id="custom_slider"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="client_taital">What Says Customers</h1>
                    </div>
                  </div>
                  <div className="client_section_2">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="client_taital_box">
                          <div className="client_img">
                            <img src="/assets/images/client-img1.png" />
                          </div>
                          <h3 className="moark_text">John D.</h3>
                          <p className="client_text">
                          ⭐⭐⭐⭐⭐<br/>
                          A seamless booking process and top-notch customer service.
                           The car was pristine and made my trip memorable. Highly recommended!"
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="client_taital_box">
                          <div className="client_img">
                            <img src="/assets/images/client-img2.png" />
                          </div>
                          <h3 className="moark_text">Sarah</h3>
                          <p className="client_text">
                          ⭐⭐⭐⭐⭐<br/>
                          Outstanding experience! Easy online booking and prompt responses. 
                          The car was comfortable and stylish. Will use again!"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="client_taital">What Says Customers</h1>
                    </div>
                  </div>
                  <div className="client_section_2">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="client_taital_box">
                          <div className="client_img">
                            <img src="/assets/images/client-img1.png" />
                          </div>
                          <h3 className="moark_text">Priya K.</h3>
                          <p className="client_text">
                          ⭐⭐⭐⭐⭐<br/>
                          Exceeded expectations with friendly service and a luxurious car. 
                          Delivery to my doorstep was incredibly convenient. Felt like a VIP!
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="client_taital_box">
                          <div className="client_img">
                            <img src="/assets/images/client-img2.png" />
                          </div>
                          <h3 className="moark_text">Vikram</h3>
                          <p className="client_text">
                          ⭐⭐⭐⭐⭐<br/>
                          The entire process was seamless and the car was in perfect condition. Truly a luxurious experience.
                          Will rent again!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="client_taital">What Says Customers</h1>
                    </div>
                  </div>
                  <div className="client_section_2">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="client_taital_box">
                          <div className="client_img">
                            <img src="/assets/images/client-img1.png" />
                          </div>
                          <h3 className="moark_text">Aman</h3>
                          <p className="client_text">
                          ⭐⭐⭐⭐⭐<br/>
                          Fantastic service and immaculate car. The team was very accommodating. 
                          Highly recommend for premium car rentals!
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="client_taital_box">
                          <div className="client_img">
                            <img src="/assets/images/client-img2.png" />
                          </div>
                          <h3 className="moark_text">Taran</h3>
                          <p className="client_text">
                          ⭐⭐⭐⭐⭐<br/>
                          Luxury Rides provided exceptional service and a fantastic vehicle. 
                          Definitely my go-to for car rentals now
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#custom_slider"
                role="button"
                data-slide="prev"
              >
                <i className="fa fa-angle-left" />
              </a>
              <a
                className="carousel-control-next"
                href="#custom_slider"
                role="button"
                data-slide="next"
              >
                <i className="fa fa-angle-right" />
              </a>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
