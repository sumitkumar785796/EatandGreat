const express = require('express')
const routes = express.Router()
// react file
const react = require('../controllers/react.controller')
//categories
const addcategoriescontrollers = require('../controllers/AddCategories.controller')
//product
const addproductcontrollers = require('../controllers/AddProduct.controller')
//authentication
const AddAuthenticationcontrollers = require('../controllers/AddAuthentication.controller')
const auth = require('../middleware/auth')
//address
const AddAddresscontrollers = require('../controllers/AddAddress.controller')
//order
const Addordercontrollers = require('../controllers/AddOrder.controller')
//subscribe
const AddSubscribecontrollers = require('../controllers/AddSubscribe.controller')
const Addcontactcontrollers = require('../controllers/AddContact.controller')
//react
routes.route('/').get(react.reactPage)
//categories
routes.route('/addcategories')
    .post(addcategoriescontrollers.AddCategories)
    .get(addcategoriescontrollers.ViewCategories)
routes.route('/addcategories/:id')
    .get(addcategoriescontrollers.ViewSingleCategories)
    .put(addcategoriescontrollers.UpdateCategories)
    .delete(addcategoriescontrollers.DeleteCategoires)
//product
routes.route('/product')
    .post(addproductcontrollers.AddProduct)
    .get(addproductcontrollers.ViewProduct)
routes.route('/product/:id')
    .get(addproductcontrollers.ViewSingleProduct)
    .put(addproductcontrollers.UpdateProduct)
//auth
routes.route('/auth')
    .post(AddAuthenticationcontrollers.Registration)
    .get(AddAuthenticationcontrollers.AllUser)
routes.route('/auths/:id')
    .get(AddAuthenticationcontrollers.SingleUser)
routes.route('/auth/:id')
    .get(AddAuthenticationcontrollers.mainVerification)
routes.route('/sigin')
    .post(AddAuthenticationcontrollers.siginUser)
//authenticated routes
routes.route('/profile').get(auth, AddAuthenticationcontrollers.userProfile)
routes.route('/logout').get(auth, AddAuthenticationcontrollers.logoutUser)
//addrress
routes.route('/address')
    .post(AddAddresscontrollers.AddAddress)
    .get(AddAddresscontrollers.ViewAdress)
//orders
routes.route('/order')
    .post(Addordercontrollers.AddOrder)
    .get(Addordercontrollers.ViewOrder)
routes.route('/order/:orderId')
    .put(Addordercontrollers.updateOrderStatus)
    .get(Addordercontrollers.ViewSingleOrder)
//email subscribe
routes.route('/subscribe')
    .post(AddSubscribecontrollers.AddSubscribe)
routes.route('/contacts')
    .post(Addcontactcontrollers.AddContact)
routes.route('/*').get(react.reactPage)
module.exports = routes