import React, { useEffect, useState } from 'react'
import Footer from '../Partitals/Footer'
import NavBar from '../Partitals/NavBar'
import { Link } from 'react-router-dom';

const AddToCart = () => {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);
    }, []);

    // Function to add item to cart
    // const addToCart = (item) => {
    //     const updatedCartItems = [...cartItems, item];
    //     setCartItems(updatedCartItems);
    //     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    // };
    const addToCart = (item) => {
        const itemWithDefaultQuantity = { ...item, quantity: 1 }; // Add quantity property with default value
        const updatedCartItems = [...cartItems, itemWithDefaultQuantity];
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    // Function to update quantity
    const updateQuantity = (index, quantity) => {
        if (quantity <= 0) {
            // You can handle this case, for example, by removing the item from the cart
            return;
        }
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = quantity;
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };
    // Function to calculate the total price for an item
    const calculateTotal = (price, quantity) => {
        return price * (quantity ?? 1);
    };
    // Function to clear all items from the cart
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };
    // Function to remove a single item from the cart by ID
    const removeItem = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };
    // Function to calculate the subtotal
    const calculateSubtotal = () => {
        const subtotal = cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity|| item.price); // Ensure price and quantity are valid numbers
        }, 0);
        // console.log("Subtotal:", subtotal);
        return subtotal;
    };

    // Function to calculate shipping charge
    const calculateShipping = () => {
        if (cartItems.length === 0) {
            return 0; // If no items, shipping charge is zero
        }
        const subtotal = calculateSubtotal();
        // Apply shipping charge based on subtotal
        return subtotal < 100 ? 45 : 0;
    };

    return (
        <>
            <NavBar />
            {/* breadcrumb-section */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>Cart</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section */}
            {/* cart */}
            <div className="cart-section mt-150 mb-150">
                <div className="container">
                    {cartItems.length === 0 ? (
                        <div className="col-lg-12 text-center">
                            <img src="https://res.cloudinary.com/dw2zdqu4n/image/upload/v1710011099/samples/ftmeqlmo3kbib8xst6v7.gif" alt="cart" />
                            <p>Please add items to your cart to continue Orders.</p>
                        </div>
                    ) : (
                        <>
                            <div className="row">
                                <div className="col-lg-8 col-md-12">
                                    <div className="cart-table-wrap">
                                        <table className="cart-table">
                                            <thead className="cart-table-head">
                                                <tr className="table-head-row">
                                                    <th className="product-remove" />
                                                    <th className="product-image">Product Image</th>
                                                    <th className="product-name">Name</th>
                                                    <th className="product-price">Price</th>
                                                    <th className="product-quantity">Quantity</th>
                                                    <th className="product-total">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map((item, index) => (
                                                    <tr className="table-body-row" key={index}>
                                                        <td className="product-remove"><button onClick={() => removeItem(item.id)}><i className="far fa-window-close" /></button></td>
                                                        <td className="product-image"><img src={item.image} alt="" /></td>
                                                        <td className="product-name">{item.itemname}</td>
                                                        <td className="product-price">&#8377; {item.price}</td>
                                                        <td className="product-quantity">
                                                            <input
                                                                type="number"
                                                                value={item.quantity || 1}
                                                                onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                                            />
                                                        </td>
                                                        <td className="product-total">&#8377; {calculateTotal(item.price, item.quantity || 1)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="total-section">
                                        <table className="total-table">
                                            <thead className="total-table-head">
                                                <tr className="table-total-row">
                                                    <th>Total</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="total-data">
                                                    <td><strong>Subtotal: </strong></td>
                                                    <td>&#8377;{calculateSubtotal()}</td>
                                                </tr>
                                                <tr className="total-data">
                                                    <td><strong>Shipping: </strong></td>
                                                    <td>&#8377;{calculateShipping()}</td>
                                                </tr>
                                                <tr className="total-data">
                                                    <td><strong>Total: </strong></td>
                                                    <td>&#8377;{calculateSubtotal() + calculateShipping()}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="cart-buttons">
                                            <a onClick={clearCart} className="boxed-btn">Clear All</a>
                                            <Link to={{
                                                pathname: '/checkout',
                                                state: { cartItems }
                                            }} className="boxed-btn black">Check Out</Link>

                                        </div>
                                    </div>
                                    <div className="coupon-section">
                                        <h3>Apply Coupon</h3>
                                        <div className="coupon-form-wrap">
                                            <form action="index.html">
                                                <p><input type="text" placeholder="Coupon" /></p>
                                                <p><input type="submit" defaultValue="Apply" /></p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* end cart */}
            <Footer />
        </>
    )
}

export default AddToCart