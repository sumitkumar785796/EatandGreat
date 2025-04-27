import React, { useEffect, useState } from 'react';
import NavBar from '../Partitals/NavBar';
import Footer from '../Partitals/Footer';
import axios from 'axios';

const MyOrder = () => {
    const [view, setView] = useState([]);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get('/order');
                setView(resp.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

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

    const formatMonthName = (monthIndex) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthIndex];
    };

    const formatTime = (hours, minutes) => {
        const hour = hours % 12 || 12;
        const period = hours < 12 ? 'AM' : 'PM';
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

    if (!profile._id) {
        return (
            <>
                <NavBar />
                <div className="container text-center" style={{ padding: '50px' }}>
                    <h3>Loading your orders...</h3>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <NavBar />
            {/* breadcrumb-section */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>My Orders</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section */}
            <div className="container my-5">
                <div className="row">
                    {
                        view
                            .filter((ele) => ele.userId?._id === profile._id)
                            .map((ele, index) => (
                                <div className="col-sm-12 mb-5" key={index}>
                                    <div className="card p-4 shadow-sm">
                                        <h5>Customer Name: {ele.addressId?.fname}</h5>
                                        <h6>User ID: {ele.userId?._id}</h6>

                                        <h4 className="mt-3">Order List</h4>
                                        <h6>Order Date: {formatDate(ele.createdAt)}</h6>

                                        <div className="row mt-4">
                                            {ele.itemDetails.map((item, idx) => (
                                                <div className="col-sm-4 mb-4" key={idx}>
                                                    <img
                                                        src={item.image}
                                                        alt={item.itemname}
                                                        style={{ width: '100%', height: '30vh', objectFit: 'cover' }}
                                                    />
                                                    <div className="mt-2">
                                                        <h6>Order Number: {ele._id}</h6>
                                                        <h5>{item.itemname}</h5>
                                                        <h6>Price: ₹{item.price}</h6>
                                                        <h6>Quantity: {item.quantity ?? 1}</h6>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <h4 className="mt-3">Total Price: ₹{ele.totalPayment}</h4>

                                        <div className="mt-2">
                                            Payment Method:
                                            {ele.paymentMethod === "Cash on Delivery" ? (
                                                <span className="btn btn-danger ms-2">Cash on Delivery</span>
                                            ) : (
                                                <span className="btn btn-success ms-2">Online</span>
                                            )}
                                        </div>

                                        <div className="mt-2">
                                            Status:
                                            {ele.status === "0" ? (
                                                <span style={{ color: 'red', marginLeft: '10px' }}>Pending</span>
                                            ) : ele.status === "1" ? (
                                                <span style={{ color: 'blue', marginLeft: '10px' }}>Processing</span>
                                            ) : (
                                                <span style={{ color: 'green', marginLeft: '10px' }}>Delivered</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MyOrder;