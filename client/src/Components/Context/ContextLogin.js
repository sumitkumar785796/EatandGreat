import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export const loginContext = createContext()
const ContextLogin = ({ children }) => {

  const isLoggedIn = !!localStorage.getItem('token');
  const [userState, setUserState] = useState('');
  const sendReq = async () => {
    try {
      const token = localStorage.getItem('token')
      const resp = await axios.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status === 200) {
        setUserState(resp.data.data.user)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    sendReq()
    // Auto logout after 2hr
    const tokenTimeout = setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('cartItems');
      window.location.reload();
    }, 2 * 60 * 60 * 1000); // 2hr 

    return () => clearTimeout(tokenTimeout);
  }, [])
  //logout

  // const history = useNavigate()
  const HandleSignOut = async () => {
    try {
      const token = localStorage.getItem('token');
      const resp = await axios.get('/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('cartItems');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <loginContext.Provider value={{ userState, isLoggedIn, HandleSignOut }}>
        {children}
      </loginContext.Provider>
    </>
  )
}

export default ContextLogin