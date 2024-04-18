import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import axios from "axios";
import { loginContext } from "../Context/ContextLogin";
const NavBar = () => {
  const { userState, isLoggedIn, HandleSignOut } = useContext(loginContext);
  return (
    <>
      {/* header */}
      <div className="top-header-area" id="sticker">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 text-center">
              <div className="main-menu-wrap">
                {/* logo */}
                <div className="site-logo">
                  <NavLink to="/">
                    <img
                      src="https://res.cloudinary.com/dw2zdqu4n/image/upload/v1709821027/samples/uecwac5xdltbgqyfc8lj.png"
                      alt="logo"
                    />
                  </NavLink>
                </div>
                {/* logo */}
                {/* menu start */}
                <nav className="main-menu">
                  <ul>
                    <li>
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="/about">About</NavLink>
                    </li>

                    <li>
                      <NavLink to="/contact">Contact</NavLink>
                    </li>
                    {isLoggedIn ? (
                      <li>
                        <div className="header-icons">
                          <NavLink to="/myorder">My Order</NavLink>
                          <Link className="shopping-cart" to="/addtocart">
                            <i className="fas fa-shopping-cart" />
                          </Link>
                          <Link to="#">
                            <img
                              src={userState.image}
                              alt={userState.name}
                              style={{
                                width: "2vw",
                                filter: "brightness(0) invert(1)",
                              }}
                            />
                          </Link>
                          <button
                            className="btn btn-primary"
                            style={{ margin: "10px" }}
                          >
                            {userState.fname} {userState.lname}
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={HandleSignOut}
                          >
                            Log Out
                          </button>
                        </div>
                      </li>
                    ) : (
                      <li>
                        <div className="header-icons">
                          <NavLink className="shopping-cart" to="/addtocart">
                            <i className="fas fa-shopping-cart" />
                          </NavLink>
                          <NavLink className="btn btn-primary" to="/signin">
                            Sign In
                          </NavLink>
                          &nbsp; &nbsp;
                          <NavLink className="btn btn-success" to="/signup">
                            Sign Up
                          </NavLink>
                        </div>
                      </li>
                    )}
                  </ul>
                </nav>
                <a className="mobile-show search-bar-icon" href="#">
                  <i className="fas fa-bars" />
                </a>
                <div className="mobile-menu" >
                </div>
                {/* menu end */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end header */}
    </>
  );
};

export default NavBar;
