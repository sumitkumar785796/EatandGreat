import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Footer = () => {
  const [input, setInput] = useState({
    email: ''
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const HandleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await axios.post('/subscribe', input)
      toast.success(resp.data.message);
      setInput({email:''})
      // if (resp.status === 200) {
      // }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorData = error.response.data;
        if (errorData.errors) {
          // Handle validation errors
          errorData.errors.forEach((error) => {
            toast.error(error.msg);
          });
        } else {
          // Handle other types of errors
          toast.error(errorData.message || 'An error occurred');
        }
      } else {
        // Handle network errors
        console.error('An error occurred:', error);
        toast.error('An error occurred. Please try again later.');
      }
    }
  }
  return (
    <>
      {/* footer */}
      <div className="footer-area">
        <ToastContainer position="top-right" />
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6">
              <div className="footer-box about-widget">
                <h2 className="widget-title">About us</h2>
                <p style={{ textAlign: 'justify' }}>Canteen services provide diverse, nutritious meals in communal settings like workplaces. Menus cater to various dietary needs with quality and hygiene standards. Customers enjoy efficient meal times, customization options, and payment flexibility. Feedback drives improvement, including sustainability initiatives, offering convenient and healthy dining experiences for individuals.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="footer-box get-in-touch">
                <h2 className="widget-title">Get in Touch</h2>
                <ul>
                  <li>Noida,  Uttar pradesh, India.</li>
                  <li>sumitkumar785796@gmail.com</li>
                  <li>+91 6202179949</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-box subscribe">
                <h2 className="widget-title">Subscribe</h2>
                <p>Subscribe to our mailing list to get the latest updates.</p>
                <form onSubmit={HandleSubmit} method='post'>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleInputChange}
                    value={input.email}
                  />
                  <button type="submit"><i className="fas fa-paper-plane" /></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end footer */}
      {/* copyright */}
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <p>Copyrights © 2024 - <NavLink to="https://cvsumitkumarcoder.onrender.com/" target='_blank'>Sumit Kumar</NavLink>,  All Rights Reserved.</p>
            </div>
            <div className="col-lg-6 text-right col-md-12">
              <div className="social-icons">
                <ul>
                  <li><a href="https://www.facebook.com/sumit785796/" target="_blank"><i className="fab fa-facebook-f" /></a></li>
                  <li><a href="https://twitter.com/sumitku00198192" target="_blank"><i className="fab fa-twitter" /></a></li>
                  <li><a href="https://www.instagram.com/sumit785796/" target="_blank"><i className="fab fa-instagram" /></a></li>
                  <li><a href="https://www.linkedin.com/in/sumit785796/" target="_blank"><i className="fab fa-linkedin" /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end copyright */}
    </>
  )
}

export default Footer