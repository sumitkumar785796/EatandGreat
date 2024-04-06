import React, { createContext } from 'react'
export const AddToCartContext = createContext()
const ContextAddToCart = ({ children ,id, itemname, price, image,qty }) => {
    const addToCartHandler = () => {
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        const isItemInCart = existingCartItems.some(item => item.id === id);
        if (isItemInCart) {
            return;
        }
        const newItem = { id, itemname, price, image, qty };
        const updatedCartItems = [...existingCartItems, newItem];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        console.log('Item added to cart:', newItem);
    };
        // Define isItemInCart here based on existing cart items
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const isItemInCart = existingCartItems.some(item => item.id === id);
    return (
        <>
            <AddToCartContext value={{addToCartHandler,isItemInCart}}>
                {children}
            </AddToCartContext>
        </>
    )
}

export default ContextAddToCart