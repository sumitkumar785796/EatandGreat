import React from 'react'
import NavBar from '../Partitals/NavBar'
import Footer from '../Partitals/Footer'
const OrderSuccess = () => {
    return (
        <>
            <NavBar />
            {/* breadcrumb-section */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>Order Successfully.</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section */}
            <img src="https://res.cloudinary.com/dw2zdqu4n/image/upload/v1710072058/samples/jkj3ddxnqe8jksp55sml.gif" alt="logo" style={{display:'block',margin:'auto'}}/>
            <Footer />
        </>
    )
}

export default OrderSuccess