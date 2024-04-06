import React, { useCallback, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import axios from "axios";
import NavBar from '../Partitals/NavBar';
import Footer from '../Partitals/Footer';
const SingleItem = () => {
    const { id } = useParams("");
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState({});
    const getData = useCallback(async () => {
        try {
            const res = await axios.get(`/product/${id}`);
            const userData = res.data.data;
            setView(userData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [id]);
    useEffect(() => {
        if (id) {
            getData();
        }
    }, [getData, id]);
    return (
        <>
            <NavBar />

            {/* breadcrumb-section */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>{view.itemname}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section */}
            {/* single product */}
            <div className="single-product mt-150 mb-150">
            {loading ? (
                <div>
                    {/*PreLoader*/}
                    <div className="loader">
                        <div className="loader-inner">
                            <div className="circle" />
                        </div>
                    </div>
                    {/*PreLoader Ends*/}
                    {/* <img
                        src="https://res.cloudinary.com/dw2zdqu4n/image/upload/v1709731860/samples/rffdkqsltukb9q8lrlit.gif"
                        alt="loading"
                        style={{ display: "block", margin: "auto" }}
                    /> */}
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="single-product-img">
                                <img src={view.image} alt="" style={{ width: '30vw', height: '60vh' }} />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="single-product-content">
                                <h3>{view.itemname}</h3>
                                <p className="single-product-pricing"> &#8377; {view.price}</p>
                                <p>{view.desc}</p>
                                <div className="single-product-form">
                                    <form action="index.html">
                                        <input type="number" placeholder={0} />
                                    </form>
                                    <NavLink to="/addtocart" className="cart-btn"><i className="fas fa-shopping-cart" /> Add to Cart</NavLink>
                                    <p><strong>Categories: </strong>{view.categories && view.categories.cname}</p>
                                </div>
                                <h4>Share:</h4>
                                <ul className="product-share">
                                    <li><a href><i className="fab fa-facebook-f" /></a></li>
                                    <li><a href><i className="fab fa-twitter" /></a></li>
                                    <li><a href><i className="fab fa-google-plus-g" /></a></li>
                                    <li><a href><i className="fab fa-linkedin" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                    )}
            </div>
            {/* end single product */}
            <Footer />
        </>
    )
}

export default SingleItem