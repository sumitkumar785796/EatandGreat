import React from "react";
import NavBar from "../Partitals/NavBar";
import Footer from "../Partitals/Footer";

const About = () => {
  return (
    <>
      <NavBar />

      {/* breadcrumb-section */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>We sale fresh food</p>
                <h1>About Us</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end breadcrumb section */}
      {/* featured section */}
      <div className="feature-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="featured-text">
                <h2 className="pb-3">
                  Eat & <span className="orange-text">Great</span>
                </h2>
                <div className="row">
                  <div className="col-lg-6 col-md-6 mb-4 mb-md-5">
                    <div className="list-box d-flex">
                      <div className="list-icon">
                        <i className="fas fa-shipping-fast" />
                      </div>
                      <div className="content">
                        <h3>Home Delivery</h3>
                        <p style={{ textAlign: "justify" }}>
                          Convenient, doorstep service bringing goods or
                          services directly to your residence, simplifying
                          shopping and enhancing accessibility.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
                    <div className="list-box d-flex">
                      <div className="list-icon">
                        <i className="fas fa-money-bill-alt" />
                      </div>
                      <div className="content">
                        <h3>Best Price</h3>
                        <p style={{ textAlign: "justify" }}>
                          Competitive cost offering optimal value, ensuring
                          affordability and customer satisfaction with
                          budget-friendly optionsum, totam rem aperiam, eaque
                          ipsa quae ab illo.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
                    <div className="list-box d-flex">
                      <div className="list-icon">
                        <i className="fas fa-briefcase" />
                      </div>
                      <div className="content">
                        <h3>Custom Box</h3>
                        <p style={{ textAlign: "justify" }}>
                          Tailored packaging solution designed to meet specific
                          needs, ensuring product protection and enhancing brand
                          identity.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="list-box d-flex">
                      <div className="list-icon">
                        <i className="fas fa-sync-alt" />
                      </div>
                      <div className="content">
                        <h3>Quick Refund</h3>
                        <p style={{ textAlign: "justify" }}>
                          Efficient process ensuring prompt return of funds,
                          enhancing customer trust and satisfaction with speedy
                          resolutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end featured section */}
      {/* shop banner */}
      {/* <section className="shop-banner">
                <div className="container">
                    <h3>December sale is on! <br /> with big <span className="orange-text">Discount...</span></h3>
                    <div className="sale-percent"><span>Sale! <br /> Upto</span>50% <span>off</span></div>
                    <a href="shop.html" className="cart-btn btn-lg">Shop Now</a>
                </div>
            </section> */}
      {/* end shop banner */}
      {/* team section */}
      {/* <div className="mt-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3>
                  Our <span className="orange-text">Team</span>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquid, fuga quas itaque eveniet beatae optio.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-team-item">
                <div className="team-bg team-bg-1" />
                <h4>
                  Jimmy Doe <span>Farmer</span>
                </h4>
                <ul className="social-link-team">
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-team-item">
                <div className="team-bg team-bg-2" />
                <h4>
                  Marry Doe <span>Farmer</span>
                </h4>
                <ul className="social-link-team">
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
              <div className="single-team-item">
                <div className="team-bg team-bg-3" />
                <h4>
                  Simon Joe <span>Farmer</span>
                </h4>
                <ul className="social-link-team">
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* end team section */}
      <Footer />
    </>
  );
};

export default About;
