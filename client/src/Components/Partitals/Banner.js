import React from 'react'
import { NavLink } from "react-router-dom";
const Banner = () => {
    return (
        <>

            {/* hero area */}
            <div className="hero-area hero-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 offset-lg-2 text-center">
                            <div className="hero-text">
                                <div className="hero-text-tablecell">
                                    <br /><br /><br />
                                    <br /><br /><br />
                                    <br /><br /><br />
                                    <h1>Life is uncertain. Eat dessert first</h1>
                                    <div className="hero-btns">
                                        <NavLink to="/contact" className="bordered-btn">Contact Us</NavLink>
                                        <br /><br /><br />
                                        <br /><br /><br />
                                        <br /><br /><br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end hero area */}
        </>
    )
}

export default Banner