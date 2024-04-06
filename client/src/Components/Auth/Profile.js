import React, { useContext } from "react";
import NavBar from "../Partitals/NavBar";
import axios from "axios";
import { loginContext } from "../Context/ContextLogin";
import Footer from "../Partitals/Footer";

const Profile = () => {
    const { userState } = useContext(loginContext);
    return (
        <>
            <NavBar />
            {/* breadcrumb-section */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>Profile</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section */}
            {/* user form */}
            <div className="contact-from-section mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mb-5 mb-lg-0">
                            <div className="form-title">
                                <h2>User Profile</h2>
                            </div>
                            <div id="form_status" />
                            <div className="contact-form">
                                <form
                                    type="POST"
                                >
                                    <p>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            name="fname"
                                            value={userState.fname}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            name="lname"
                                            value={userState.lname}
                                        />
                                    </p>
                                    <p>
                                        <input
                                            type="Email"
                                            placeholder="Email"
                                            name="email"
                                            value={userState.email}
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={userState.password}
                                        />
                                    </p>
                                    <p>
                                        <input type="file" style={{ width: '37vw' }} />
                                    </p>
                                    <p>
                                        <input type="submit" defaultValue="Submit" />
                                    </p>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="contact-form-wrap">
                                <div className="contact-form-box">
                                    <h4>
                                        <i className="fas fa-map" /> Profile
                                    </h4>
                                    <img src={userState.image} alt={userState.fname} style={{ width: '90px', height: '90px' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end user form */}
            <Footer />
        </>
    );
};

export default Profile;
