const mongoose = require('mongoose');
const uploadMiddleware = require('../middleware/FileUploadMiddleware')
const { validationResult } = require("express-validator");
const {AddProductValidation,UpdateProductValidation} = require('../helpers/AddProductValidator')
const categoires = require('../models/AddCategoriesmodels')
const product = require('../models/AddProductmodels')
const cloudinary = require('../configs/Cloudinary')

exports.AddProduct = async (req, res) => {
    try {
        uploadMiddleware(req, res, async (err) => {
            if (err) {
                console.error('Error during file upload:', err)
                return res.status(500).json({ message: 'Error uploading file. Please try again later.' })
            }
            // Check if file exists and has valid image MIME type
            if (!req.file || !req.file.path || !['image/jpeg', 'image/jpg', 'image/avif', 'image/gif', 'image/png'].includes(req.file.mimetype)) {
                return res.status(400).json({ message: 'Invalid file type: Only JPEG, JPG, AVIF, GIF, and PNG files are allowed.' });
            }
            // Run validation rules
            await Promise.all(
                AddProductValidation.map((AddProductValidation) => AddProductValidation.run(req))
            );
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { categories ,itemname,desc,price,qty} = req.body;
            console.log(categories ,itemname,desc,price,qty)
            try {
                const categoriesId = await categoires.findById(categories);
                console.log(categoriesId)
                const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
                    public_id: req.file.filename,
                    resource_type: 'auto', // Use Cloudinary's automatic resource type detection
                    secure: true, // Ensure uploaded files are secured by default
                })
                const dataSend = await product.create({
                    image: cloudinaryResult.secure_url,
                    categories:categoriesId,
                    itemname,
                    desc,
                    price,
                    qty
                })
                return res.status(201).json({ message: 'Successfully Categories created...', data: dataSend })
            } catch (error) {
                console.log(error)
                return res.status(400).json({ message: 'Not created something problem...', data: error })
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
exports.ViewProduct = async (req,res)=>{
    try {
        const view = await product.find().populate('categories')
        return res.status(200).json({message:'View Data',data:view})
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error',data:error})
        
    }
}
exports.ViewSingleProduct = async (req,res)=>{
    try {
        const {id} = req.params
        const view = await product.findById(id).populate('categories')
        return res.status(200).json({message:'View Data',data:view})
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error',data:error})
        
    }
}

exports.UpdateProduct = async (req, res) => {
    try {
        uploadMiddleware(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: 'File upload error' })
            }

            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Not found Id' })
            }

            // Run validation rules
            await Promise.all(
                UpdateProductValidation.map((UpdateProductValidation) => UpdateProductValidation.run(req))
            );

            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const Update = await product.findById(id);
            if (!Update) {
                return res.status(404).json({ message: 'product is not Updated' })
            }
            const { categories ,itemname,desc,price,qty} = req.body;
            let newImage = req.file ? req.file.filename : null;

            try {
                const categoriesId = await categoires.findById(categories);
                if (newImage) {
                    // Upload new file to Cloudinary
                    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
                        public_id: newImage
                    })
                    // Delete old file from Cloudinary
                    if (Update.image) {
                        const publicId = Update.image.match(/\/upload\/v\d+\/(.+)\./)[1];
                        await cloudinary.api.delete_resources([publicId], {
                            type: 'upload',
                            resource_type: 'image'
                        });
                    }
                    Update.image = cloudinaryResult.secure_url;
                }
                // Update other data
                Update.categories = categoriesId;
                Update.itemname = itemname;
                Update.desc = desc;
                Update.price = price;
                Update.qty = qty;
                const updated = await Update.save();
                return res.status(200).json({ message: 'item is successfully Updated...', data: updated });
            } catch (error) {
                return res.status(400).json({ message: 'Error updating', data: error });
            }
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', data: error });
    }
}
