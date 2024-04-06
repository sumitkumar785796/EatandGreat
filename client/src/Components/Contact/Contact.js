import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../Partitals/NavBar";
import Footer from "../Partitals/Footer";

const Contact = () => {
  const [input, setInput] = useState({
    fname: "",
    email: "",
    phone: "",
    subject: "",
    msg: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("/contacts", input);
      toast.success(resp.data.message);
      setInput({
        fname: "",
        email: "",
        phone: "",
        subject: "",
        msg: "",
      });
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
  };
  return (
    <>
      <NavBar />
      {/* breadcrumb-section */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Get 24/7 Support</p>
                <h1>Contact us</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end breadcrumb section */}
      {/* contact form */}
      <div className="contact-from-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="form-title">
                <ToastContainer position="top-right" />
                <h2>Have you any question?</h2>
              </div>
              <div id="form_status" />
              <div className="contact-form">
                <form>
                  <p>
                    <input
                      type="text"
                      placeholder="Name"
                      name="fname"
                      id="name"
                      onChange={handleInputChange}
                      value={input.fname}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      id="email"
                      onChange={handleInputChange}
                      value={input.email}
                    />
                  </p>
                  <p>
                    <input
                      type="tel"
                      placeholder="Phone"
                      name="phone"
                      id="phone"
                      onChange={handleInputChange}
                      value={input.phone}
                    />
                    <input
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      id="subject"
                      onChange={handleInputChange}
                      value={input.subject}
                    />
                  </p>
                  <p>
                    <textarea
                      name="msg"
                      id="message"
                      cols={30}
                      rows={10}
                      placeholder="Message"
                      onChange={handleInputChange}
                      value={input.msg}
                    />
                  </p>
                  <p>
                    <input type="submit" defaultValue="Submit" onClick={HandleSubmit} />
                  </p>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-form-wrap">
                <div className="contact-form-box">
                  <h4>
                    <i className="fas fa-map" /> Shop Address
                  </h4>
                  <p>
                    Noida <br /> Uttar pradesh <br /> India
                  </p>
                </div>
                <div className="contact-form-box">
                  <h4>
                    <i className="far fa-clock" /> Shop Hours
                  </h4>
                  <p>
                    MON - FRIDAY: 8 to 9 PM <br /> SAT - SUN: 10 to 8 PM{" "}
                  </p>
                </div>
                <div className="contact-form-box">
                  <h4>
                    <i className="fas fa-address-book" /> Contact
                  </h4>
                  <p>
                    Phone: +91 6202179949 <br />
                    Email:sumitkumar785796@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end contact form */}
      {/* find our location */}
      <div className="find-location blue-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <p>
                {" "}
                <i className="fas fa-map-marker-alt" /> Find Our Location
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* end find our location */}
      {/* google map section */}
      <div className="embed-responsive embed-responsive-21by9">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224419.4030009559!2d77.25830980210966!3d28.49300025528103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cea1a83be5989%3A0x6a3690bfa642b5c3!2sGALGOTIAS%20UNIVERSITY!5e0!3m2!1sen!2sin!4v1711012842460!5m2!1sen!2sin"
          width={600}
          height={450}
          frameBorder={0}
          style={{ border: 0 }}
          allowFullScreen
          className="embed-responsive-item"
        />
      </div>
      {/* end google map section */}
      <Footer />
    </>
  );
};

export default Contact;
