import React from 'react'
import Search from './Search'
import Banner from './Banner'
import NavBar from './NavBar'
import Footer from './Footer'
import Menu from '../Menu/Menu'

const Header = () => {
  return (
    <>
      <NavBar />
      <Search />
      <Banner />
      {/* features list section */}
      <div className="list-section pt-80 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="list-box d-flex align-items-center">
                <div className="list-icon">
                  <i className="fas fa-shipping-fast" />
                </div>
                <div className="content">
                  <h3>Free Shipping</h3>
                  <p>When order over &#8377;100</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="list-box d-flex align-items-center">
                <div className="list-icon">
                  <i className="fas fa-phone-volume" />
                </div>
                <div className="content">
                  <h3>24/7 Support</h3>
                  <p>Get support all day</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="list-box d-flex justify-content-start align-items-center">
                <div className="list-icon">
                  <i className="fas fa-sync" />
                </div>
                <div className="content">
                  <h3>Refund</h3>
                  <p>Get refund within 3 days!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end features list section */}
      <Menu />
      {/* cart banner section */}

      {/* end cart banner section */}
      <br />
      {/* advertisement section */}
      <div className="abt-section mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="abt-bg">
                <iframe width="660" height="650" src="https://www.youtube.com/embed/0g1uOi8K0mI?si=QSdmaSnFvYu7FkXG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="abt-text">
                <p className="top-sub">Since Year 2024</p>
                <h2>Eat & <span className="orange-text">Great</span></h2>
                <p style={{ textAlign: 'justify' }}>Canteen services offer a range of nutritious meals and beverages in communal settings like workplaces or institutions. Menus are carefully planned to cater to diverse dietary needs, ensuring quality and hygiene standards are met. Customers enjoy efficient meal times with options for customization and special requests. Payments are typically made through cash, electronic methods, or vouchers, with pricing reflecting meal types and portions. Feedback mechanisms drive continuous improvement, including sustainability efforts. Overall, canteen services provide convenient, healthy dining experiences that contribute to individual well-being and productivity in various environments.</p>

                <a href="about.html" className="boxed-btn mt-4">know more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end advertisement section */}


      <Footer />
    </>
  )
}

export default Header