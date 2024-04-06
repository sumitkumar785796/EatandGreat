import React, { useEffect, useState } from "react";
import NavBar from "../Partitals/NavBar";
import Footer from "../Partitals/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const CheckOut = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
    console.log(items)
  }, []);

  // Function to calculate the total price for an item
  const calculateTotal = (price, quantity) => {
    return price * (quantity ?? 1);
  };

  // Function to calculate the subtotal
  const calculateSubtotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity || item.price);
    }, 0);
    return subtotal;
  };

  // Function to calculate shipping charge
  const calculateShipping = () => {
    if (cartItems.length === 0) {
      return 0;
    }
    const subtotal = calculateSubtotal();
    return subtotal < 100 ? 45 : 0;
  };

  const [view, setView] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/address");
        setView(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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

  // Add address
  const [input, setInput] = useState({
    fname: "",
    mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    userId: "",
  });
  const [loading, setLoading] = useState(false);

  // Function to handle changes in input fields
  const ChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const HandleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // Get the current time
      const currentTime = new Date().toLocaleString();
      // Set the current time and user ID in the form data
      const formData = {
        ...input,
        time: currentTime,
        userId: profile._id // Assuming profile._id holds the user ID
      };
      const res = await axios.post("/address", formData);
      toast.success(res.data.message);
      setInput({
        fname: "",
        mobile: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
        userId: ""
      });
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
    } finally {
      setLoading(false);
    }
  }
  //order confirmed
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const handleOrderSubmit = async (e) => {
    try {
      e.preventDefault();
      // Validate if address and payment method are selected
      if (!selectedAddress) {
        toast.error("Please select a shipping address");
        return;
      }
      if (!selectedPaymentMethod) {
        toast.error("Please select a payment method");
        return;
      }
      // Construct the order object
      const orderData = {
        addressId: selectedAddress._id,
        userId: profile._id,
        itemDetails: cartItems,
        paymentMethod: selectedPaymentMethod,
        totalPayment: calculateSubtotal() + calculateShipping()
      };
      // Make the API call to submit the order
      const response = await axios.post("/order", orderData);
      //clear cart
      localStorage.removeItem('cartItems');
      navigate('/successorder')
      // Display success message
      toast.success(response.data.message);
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
      <NavBar />
      {/* breadcrumb-section */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <ToastContainer position="top-right" />
                <h1>Check Out Product</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end breadcrumb section */}
      {/* check out section */}
      <div className="checkout-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="checkout-accordion-wrap">
                <div className="accordion" id="accordionExample">
                  <div className="card single-accordion">
                    <div className="card-header" id="headingOne">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Add New Address
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <div className="billing-address-form">
                          <div className="row">
                            <div className="col-sm-6">
                              <input
                                type="text"
                                placeholder="Name"
                                className="form-control"
                                name="fname"
                                onChange={ChangeInput}
                                value={input.fname}
                              />
                            </div>
                            <div className="col-sm-6">
                              <input
                                type="text"
                                placeholder="10 digit Mobile Number"
                                className="form-control"
                                name="mobile"
                                onChange={ChangeInput}
                                value={input.mobile}
                              />
                            </div>
                          </div>
                          <br />
                          <div className="row">
                            <div className="col-sm-6">
                              <input
                                type="text"
                                placeholder="Pincode"
                                className="form-control"
                                name="pincode"
                                onChange={ChangeInput}
                                value={input.pincode}
                              />
                            </div>
                            <div className="col-sm-6">
                              <input
                                type="text"
                                placeholder="Locality"
                                className="form-control"
                                name="locality"
                                onChange={ChangeInput}
                                value={input.locality}
                              />
                            </div>
                          </div>
                          <br />
                          <div className="row">
                            <div className="col-sm-12">
                              <textarea
                                name="address"
                                cols="20"
                                rows="7"
                                className="form-control"
                                onChange={ChangeInput}
                                value={input.address}
                              ></textarea>
                            </div>
                          </div>
                          <br />
                          <div className="row">
                            <div className="col-sm-6">
                              <input
                                type="text"
                                placeholder="City"
                                className="form-control"
                                name="city"
                                onChange={ChangeInput}
                                value={input.city}
                              />
                            </div>
                            <div className="col-sm-6">
                              <input
                                type="text"
                                placeholder="State"
                                className="form-control"
                                name="state"
                                onChange={ChangeInput}
                                value={input.state}
                              />
                            </div>
                          </div>
                          <br />
                          <br />
                          <button className="btn btn-primary" onClick={HandleSubmit}>
                            {loading ? "Submitting..." : 'Save Address'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card single-accordion">
                    <div className="card-header" id="headingTwo">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Select Shipping Address
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse show"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <div className="shipping-address-form">
                          {view.filter((ele) => ele.userId === profile._id).map((ele, index) => (

                            <div className="form-check form-check-inline" key={index}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="addressId"
                                id={`inlineRadio${index}`}
                                value={ele._id}
                                onChange={() => setSelectedAddress(ele)}
                              />
                              <label className="form-check-label" htmlFor={`inlineRadio${index}`}>
                                {ele.fname}
                              </label>
                            </div>

                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card single-accordion">
                    <div className="card-header" id="headingThree">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Payment Method
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseThree"
                      className="collapse"
                      aria-labelledby="headingThree"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <div className="card-details">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="paymentMethod"
                              id="online"
                              value='online'
                              onChange={() => setSelectedPaymentMethod("Online")}
                            />
                            <label className="form-check-label" htmlFor="online">
                              Online
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="paymentMethod"
                              id="cod"
                              value='Cash on Delivery'
                              onChange={() => setSelectedPaymentMethod("Cash on Delivery")}
                            />
                            <label className="form-check-label" htmlFor="cod">
                              Cash on Delivery
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="order-details-wrap">
                <table className="order-details">
                  <thead>
                    <tr>
                      <th>Your order Details</th>
                      <th></th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody className="order-details-body">
                    <tr>
                      <td>#</td>
                      <td>Item</td>
                      <td>Total</td>
                    </tr>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={item.image}
                            alt={item.itemname}
                            style={{ width: "5vw", height: "5vh" }}
                          />
                        </td>
                        <td>{item.itemname}</td>
                        <td>
                          &#8377;
                          {calculateTotal(item.price, item.quantity || 1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tbody className="checkout-details">
                    <tr>
                      <td>Subtotal</td>
                      <td>&#8377;{calculateSubtotal()}</td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td>&#8377;{calculateShipping()}</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>
                        &#8377;{calculateSubtotal() + calculateShipping()}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <a href="" onClick={handleOrderSubmit} className="boxed-btn">
                  Place Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end check out section */}
      <Footer />
    </>
  );
};

export default CheckOut;
