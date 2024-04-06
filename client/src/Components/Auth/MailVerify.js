import React, { useCallback, useEffect} from "react";
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MailVerify = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    const getData = useCallback(async () => {
        try {
            const res = await axios.get(`/auth/${id}`);
            // if (res.status === 201) {
                // setTimeout(() => {
                // }, 2000);
                toast.success(res.data.message);
                // navigate('/signin')
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
    }, [id, navigate]);

    useEffect(() => {
        getData();
    }, [getData, id]);

    return (
        <>
            {/* breadcrumb-section */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <ToastContainer position="top-right" />
                                <h1>Verify Mail</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section */}
            <div className="container">
                <h5>Congratulations! Your account verification process has been successfully completed. You can now enjoy full access to our services. Thank you for verifying your email address. If you have any questions or need further assistance, please don't hesitate to contact our support team. We're here to help you make the most out of your experience with us.</h5>
                <Link to="/signin" className="btn btn-primary">Sign In Account</Link>
            </div>
            <div style={containerStyle}>
                <img src="https://res.cloudinary.com/dw2zdqu4n/image/upload/v1709910470/samples/entknj6vmuzky34t8imw.jpg" alt="img" />
            </div>
        </>
    );
};

export default MailVerify;
