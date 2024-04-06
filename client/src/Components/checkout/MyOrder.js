import React, { useEffect, useState } from 'react'
import NavBar from '../Partitals/NavBar'
import Footer from '../Partitals/Footer'
import axios from 'axios'

const MyOrder = () => {
    const [view, setView] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get('/order')
                setView(resp.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    const formatMonthName = (monthIndex) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthIndex];
    };

    const formatTime = (hours, minutes) => {
        const hour = hours % 12 || 12; // Convert 24-hour format to 12-hour format
        const period = hours < 12 ? 'AM' : 'PM'; // Determine AM/PM designation
        return `${hour}:${String(minutes).padStart(2, '0')} ${period}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${day} ${formatMonthName(monthIndex)} ${year} at ${formatTime(hours, minutes)}`;
    };
    // Profile
    const [profile, setProfile] = useState({});
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found in localStorage");
                }

                const response = await axios.get("/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data.data.user);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <>
            <NavBar />
            {/* breadcrumb-section */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>My Order</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section */}
            <div className="container">
                <div className="row">
                    {
                        view
                            .filter((ele) => ele.userId._id ===profile._id )
                            .map((ele, index) => (

                                <div className="col-sm-12" key={index}>
                                    <h5>{ele.addressId.fname}</h5>
                                    <h5>{ele.userId._id}</h5>

                                    <h4>Order List</h4>
                                    <h6>{formatDate(ele.createdAt)}</h6>
                                    <h5>
                                        <div className="row" >
                                            {ele.itemDetails.map((item, index) => (
                                                <div className="col-sm-4" key={index}>
                                                    <img src={item.image} alt={item.itemname} style={{ width: '20vw', height: '30vh' }} />
                                                    <br />
                                                    <br />
                                                    <h4>Order Number</h4>
                                                    <h6>{ele._id}</h6>
                                                    <h3>{item.itemname}</h3>
                                                    <h4>&#8377;{item.price}</h4>
                                                    <h4>Quantity:{
                                                        item.quantity ? (item.quantity) : (<span>1</span>)
                                                    }</h4>
                                                </div>
                                            ))}
                                        </div>
                                    </h5>
                                    <h4>Total Price &#8377;{ele.totalPayment}</h4>
                                    <h4>
                                        {ele.paymentMethod === "Cash on Delivery" ?
                                            <h4 className='btn btn-danger'>Cash on Delivery</h4> :
                                            <h4 className='btn btn-success'>Online</h4>}
                                    </h4>
                                    <h4>
                                        Status {ele.status === "0" ? (
                                            <h4 style={{ color: 'red' }}>Pending</h4>
                                        ) : ele.status === "1" ? (
                                            <h4 style={{ color: 'blue' }}>Processing</h4>
                                        ) : (
                                            <h4 style={{ color: 'green' }}>Delivered</h4>
                                        )}
                                    </h4>
                                </div>
                            ))
                    }

                </div>
            </div>
            <Footer />
        </>
    )
}

export default MyOrder