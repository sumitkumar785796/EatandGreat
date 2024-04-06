import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
  const boxedinput = {
    border: "1px solid #ccc",
    borderRadius: "15px",
    padding: "30px",
    width: "100%",
    boxSizing: "border-box",
  };
  const bg = {
    border: "12px solid black",
    borderRadius: "100px 0px",
    width: "50vw",
    height: "50vh",
  };
  const [input, setInput] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
    //clear form 
    const resetForm = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      cpassword: "",
    }
  const HandleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await axios.post('/auth', input)
      console.log(resp.data.data)
      toast.success(resp.data.message);
      setInput(resetForm)
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
      {/* breadcrumb-section */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <h1>Sign Up</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end breadcrumb section */}
      {/* single product */}
      <div className="single-product mt-150 mb-150">
      <ToastContainer position="top-right" />
        <div className="container" style={bg}>
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                className="form-control"
                autoComplete="off"
                style={boxedinput}
                onChange={HandleChange}
                value={input.fname}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                name="lname"
                placeholder="Last  Name"
                className="form-control"
                autoComplete="off"
                style={boxedinput}
                onChange={HandleChange}
                value={input.lname}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="form-control"
                autoComplete="off"
                style={boxedinput}
                onChange={HandleChange}
                value={input.email}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                autoComplete="off"
                style={boxedinput}
                onChange={HandleChange}
                value={input.password}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                placeholder="Confirm Password"
                className="form-control"
                autoComplete="off"
                style={boxedinput}
                onChange={HandleChange}
                value={input.cpassword}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <br />
              <button className="btn btn-primary" onClick={HandleSubmit}>Sign Up</button>
              Already have an account?
              <Link style={{ color: "red" }} to="/signin">
                Sign In
              </Link>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
      {/* end single product */}
    </>
  );
};

export default Signup;
