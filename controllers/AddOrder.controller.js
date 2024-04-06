const Address = require('../models/AddAddressmodels')
const Signup = require('../models/Signupmodels')
const order = require('../models/AddOrdermodels')
const { validationResult } = require("express-validator");
const { AddOrderValidation } = require('../helpers/AddOrdervalidator')
exports.AddOrder = async (req, res) => {
    try {
        // Run validation rules
        await Promise.all(
            AddOrderValidation.map((AddOrderValidation) => AddOrderValidation.run(req))
        );
        // Check for validation errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { addressId, paymentMethod, userId, itemDetails, totalPayment } = req.body
        try {
            const addre = await Address.findById(addressId)
            const sign = await Signup.findById(userId)
            const senddata = await order.create({
                addressId: addre, paymentMethod, userId: sign, itemDetails, totalPayment
            })
            return res.status(201).json({ message: 'Your Order is confirmed...', data: senddata })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'Not created something problem...', data: error })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error', data: error })
    }
}
exports.ViewOrder = async (req, res) => {
    try {
        const view = await order.find().populate('addressId userId').sort({ _id: -1 })
        return res.status(200).json({ message: 'View Data', data: view })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', data: error })

    }
}
exports.ViewSingleOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const view = await order.findById(orderId)
        return res.status(200).json({ message: 'View Data', data: view })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', data: error })

    }
}
exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order status updated', data: updatedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', data: error });
    }
};