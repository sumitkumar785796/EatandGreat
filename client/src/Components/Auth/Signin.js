import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { UserContext } from "../../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signin = () => {
  const navigate = useNavigate()
  // const { setUserState, setProfile } = useContext(UserContext);
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
    height: "20vh",
  };
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const HandleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await axios.post('/sigin', input)
      if (resp.status === 200) {
        console.log(resp.data);
        localStorage.setItem("token", resp.data.accessToken)
        navigate('/')
        window.location.reload();
    }
      // const token = resp.data.accessToken;
      // const response = await axios.get("/profile", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // setUserState({ isLoggedIn: true, token: token });
      // setProfile(response.data.data.user);
      // navigate('/');
      // toast.success(resp.data.message);
    } catch (error) {
      if (error.response && error.response?.status === 400 || error.response?.status === 400) {
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
                <h1>Sign In</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end breadcrumb section */}
      {/* single product */}
      <div className="single-product mt-150 mb-150">
        <ToastContainer position="top-right" />
        <div className="container">
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
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <br />
              <button className="btn btn-primary" onClick={HandleSubmit}>Sign In</button>
              Don't have an account?
              <Link style={{ color: "red" }} to="/signup">
                Registration
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      {/* end single product */}
    </>
  );
};

export default Signin;
