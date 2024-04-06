import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const SingleMenuStore = ({ id, itemname, price, image,qty }) => {
    const addToCartHandler = () => { 
        // Get existing cart items from localStorage
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        // Check if the item already exists in the cart
        const isItemInCart = existingCartItems.some(item => item.id === id);
        if (isItemInCart) {
            // Item already in cart, show go to cart button
            return;
        }
        // Create a new item object
        const newItem = { id, itemname, price, image,qty };
        // Add the new item to the existing cart items
        const updatedCartItems = [...existingCartItems, newItem];
        // Store the updated cart items in localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        // Log the item data (you can remove this if not needed)
        console.log('Item added to cart:', newItem);
    };

    // Define isItemInCart here based on existing cart items
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const isItemInCart = existingCartItems.some(item => item.id === id);

    return (
        <>
            <div className="col-lg-4 col-md-6 text-center">
                <div className="single-product-item">
                    <div className="product-image">
                        {/* <NavLink to={`/Singleitem/${id}`} >
                            </NavLink> */}
                            <img src={image} alt='img' style={{ width: '30vw', height: '25vh' }} />
                    </div>
                    <h4>{itemname}</h4>
                    <p>&#8377; {price}</p>
                    {/* Check if the item is already in the cart, if yes, show go to cart button, otherwise show add to cart button */}
                    {isItemInCart ? (
                        <Link to="/addtocart" className="btn btn-danger">Go to Cart</Link>
                    ) : (
                        <Link
                            to={{
                                pathname: '/addtocart',
                                state: { id, itemname, price, image,qty }
                            }}
                            className='btn btn-primary'
                            onClick={addToCartHandler}
                        >
                            Add To Cart
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default SingleMenuStore;
