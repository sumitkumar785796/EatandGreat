const cloudinary = require('../configs/Cloudinary');
const BlackList = require('../models/Blacklist')
const Signup = require('../models/Signupmodels');
const uploadMiddleware = require('../middleware/FileUploadMiddleware');
const { validationResult } = require("express-validator");
const { signupValidation, SignInValidation } = require('../helpers/Signupvalidator');
const mailer = require('../helpers/nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
exports.Registration = async (req, res) => {
    try {
        uploadMiddleware(req, res, async (err) => {
            if (err) {
                console.error('Error during file upload:', err);
                // You might want to handle the error here, depending on your requirements.
            }
            // Run validation rules
            await Promise.all(
                signupValidation.map((signupValidation) => signupValidation.run(req))
            );
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { fname, lname, email, password, cpassword } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            const hashedCPassword = await bcrypt.hash(cpassword, 12);

            try {
                let imageUrl = 'https://res.cloudinary.com/dw2zdqu4n/image/upload/v1709902610/samples/gsd8ebwq4tvnfqmm6la1.png';

                if (req.file) {
                    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
                        public_id: req.file.filename,
                        resource_type: 'auto',
                        secure: true,
                    });
                    imageUrl = cloudinaryResult.secure_url; // Use Cloudinary URL if file uploaded
                } else {
                    // If no file uploaded, use default URL
                    imageUrl = 'https://res.cloudinary.com/dw2zdqu4n/image/upload/v1709902610/samples/gsd8ebwq4tvnfqmm6la1.png';
                }

                const dataSend = await Signup.create({
                    image: imageUrl, // Use either Cloudinary URL or default URL
                    fname,
                    lname,
                    email,
                    password: hashedPassword,
                    cpassword: hashedCPassword
                });

                const msg = `<h3>Dear ${fname} ${lname}</h3><br/>Thanks for registering for an account on My Account! Before we get started, we just need to confirm that this is you. Click below to verify your email address <br/> <a href="https://eatandgreat.onrender.com/authe/${dataSend._id}" style="background-color:black;color:white;text-decoration:none;margin:200px;font-size:30px;">Verify Email</a>`;
                mailer.emailMail(email, 'Mail Verification', msg);
                return res.status(201).json({ message: 'Successfully Registration please verify your mail...', data: dataSend });
            } catch (error) {
                console.log(error);
                return res.status(400).json({ message: 'Not created something problem...', data: error });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.mainVerification = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'Not Found Something Error' })
        }

        const userData = await Signup.findOne({ _id: id })
        if (!userData) {
            return res.status(400).json({ message: 'User is not Found' })
        }
        if (userData.is_verified == 1) {
            return res.status(200).json({ message: 'Your mail is already verified...' })
        }
        const verify = await Signup.findByIdAndUpdate({ _id: id }, {
            $set: {
                is_verified: 1
            }
        })
        return res.status(201).json({ message: 'Mail has been verified successfully...', data: verify })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
const generateAccessToken = async (user) => {
    const tokenjwt = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })
    return tokenjwt
}
exports.siginUser = async (req, res) => {
    try {
        // Run validation rules
        await Promise.all(SignInValidation.map((SignInValidation) => SignInValidation.run(req)));
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body
        const userData = await Signup.findOne({ email })
        if (!userData) {
            return res.status(401).json({ message: 'Invalid Credentials!' })
        }
        const passwordMatch = await bcrypt.compare(password, userData.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Credentials!' })
        }
        if (userData.is_verified == 0) {
            return res.status(400).json({ message: 'User is not verified...' })
        }
        const accessToken = await generateAccessToken({ user: userData })
        return res.status(200).json({ message: 'successfully login...', user: userData, accessToken: accessToken, tokentype: "Bearer" })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error...' })
    }
}
exports.userProfile = async (req, res) => {
    try {
        return res.status(200).json({ message: 'view user', data: req.user })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error...' })
    }
}
exports.updateProfile = async (req, res) => {
    try {
        const { fname, lname, email, password, cpassword } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const hashedCPassword = await bcrypt.hash(cpassword, 12);
        Signup.findByIdAndUpdate()
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error...' })

    }
}
exports.logoutUser = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['authorization']
        const bearer = token.split(' ')
        const bearerToken = bearer[1]
        const newBlackList = await BlackList.create({
            token: bearerToken
        })
        return res.status(200).json({ message: 'Logout successfully...', BlackList: newBlackList })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error...' })
    }
}
exports.AllUser = async (req, res) => {
    try {
        const view = await Signup.find()
        return res.status(200).json({ message: 'view all user', data: view })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', data: error })
    }
}
exports.SingleUser = async (req, res) => {
    const { id } = req.params
    try {
        const view = await Signup.findById(id)
        return res.status(200).json({ message: 'view all user', data: view })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', data: error })
    }
}