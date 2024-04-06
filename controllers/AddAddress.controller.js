const Address = require('../models/AddAddressmodels')
const Signup = require('../models/Signupmodels')
const { validationResult } = require("express-validator");
const { AddAddressValidation } = require('../helpers/AddAddressvalidator')
exports.AddAddress = async (req, res) => {
    try {
        // Run validation rules
        await Promise.all(
            AddAddressValidation.map((AddAddressValidation) => AddAddressValidation.run(req))
        );
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { fname,mobile,pincode,locality, address,city,state,userId } = req.body;
        try {
            const user=await Signup.findById(userId);
            const senddata = await Address.create({
                fname,mobile,pincode,locality, address,city,state,userId:user
            })
            return res.status(201).json({ message: 'Add Address successfully',data:senddata })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'Not created something problem...',data:error })
        }
    } catch (error) {
       return res.status(500).json({ message: 'Internal Server Error' ,data:error})
    }
}
exports.ViewAdress=async(req,res)=>{
    try {
        const view = await Address.find()
        return res.status(200).json({ message: 'View Data' ,data:view})
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' ,data:error})
        
    }
}