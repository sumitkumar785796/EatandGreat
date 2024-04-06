import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './Components/Partitals/Header'
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import SingleMenu from './Components/Menu/SingleMenu';
import Signin from './Components/Auth/Signin';
import Signup from './Components/Auth/Signup';
import SingleItem from './Components/Menu/SingleItem';
import AddToCart from './Components/Menu/AddToCart';
import MailVerify from './Components/Auth/MailVerify';
import CheckOut from './Components/checkout/CheckOut';
import OrderSuccess from './Components/checkout/OrderSuccess';
import MyOrder from './Components/checkout/MyOrder';
import ContextLogin from './Components/Context/ContextLogin';
import Profile from './Components/Auth/Profile';
import ContextAddToCart from './Components/Context/ContextAddToCart';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <>
      <ContextLogin>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Header />} />
            {isLoggedIn && <Route path='/profile' element={<Profile />} />}
            <Route path='/SingleMenu/:id' element={<SingleMenu />} />
            <Route path='/Singleitem/:id' element={<SingleItem />} />
            <Route path='/addtocart' element={<AddToCart />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            {!isLoggedIn && <Route path='/signin' element={<Signin />} />}
            {!isLoggedIn && <Route path='/signup' element={<Signup />} />}
            {!isLoggedIn && <Route path='/authe/:id' element={<MailVerify />} />}
            {isLoggedIn ? (
              <Route path="/checkout" element={<CheckOut />} />
            ) : (
              <Route path="/checkout" element={<Navigate to="/signin" />} />
            )}
            {isLoggedIn && <Route path="/successorder" element={<OrderSuccess />} />}
            {isLoggedIn && <Route path="/myorder" element={<MyOrder />} />}
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
      </ContextLogin>
    </>
  )
}

export default App;