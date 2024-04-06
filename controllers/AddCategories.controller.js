const uploadMiddleware = require('../middleware/FileUploadMiddleware')
const { validationResult } = require("express-validator");
const {AddCategoriesValidation,UpdateCategoriesValidation} = require('../helpers/AddCategoriesvalidator')
const categoires = require('../models/AddCategoriesmodels')
const cloudinary = require('../configs/Cloudinary')
const mongoose = require('mongoose');
exports.AddCategories = async (req, res) => {
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
                AddCategoriesValidation.map((AddCategoriesValidation) => AddCategoriesValidation.run(req))
            );
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { cname } = req.body;
            try {
                const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
                    public_id: req.file.filename,
                    resource_type: 'auto', // Use Cloudinary's automatic resource type detection
                    secure: true, // Ensure uploaded files are secured by default
                })
                const dataSend = await categoires.create({
                    image: cloudinaryResult.secure_url,
                    cname
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

exports.ViewCategories = async (req, res) => {
    try {
        const view = await categoires.find()
        return res.status(200).json({ message: 'view data',data:view })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

exports.ViewSingleCategories = async (req,res) =>{
    const {id}=req.params
    try {
        const view = await categoires.findById(id)
        return res.status(200).json({ message: 'view data',data:view })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
exports.UpdateCategories = async (req, res) => {
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
                UpdateCategoriesValidation.map((UpdateCategoriesValidation) => UpdateCategoriesValidation.run(req))
            );

            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const Update = await categoires.findById(id);
            if (!Update) {
                return res.status(404).json({ message: 'Categories is not Updated' })
            }
            const { cname } = req.body;
            let newImage = req.file ? req.file.filename : null;

            try {
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
                Update.cname = cname;
                const updated = await Update.save();
                return res.status(200).json({ message: 'categories updated successfully', data: updated });
            } catch (error) {
                return res.status(400).json({ message: 'Error updating', data: error });
            }
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', data: error });
    }
}
exports.DeleteCategoires = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Id' });
        }
        const deleteId = await categoires.findByIdAndDelete(id)
        if (!deleteId) {
            return res.status(400).json({ message: 'Not found id' })
        }
        const CatImage = deleteId.image
        if (CatImage) {
            const publicId = CatImage.match(/\/upload\/v\d+\/(.+)\./)[1]
            const deleteData = await cloudinary.api.delete_resources([publicId], {
                type: 'upload',
                resource_type: 'image'
            })
            return res.status(200).json({ message: 'Delete Sucessfully...', data: deleteData })
        } else {
            return res.status(400).json({ message: 'Not Delete data...' })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server Error', data: error })
    }
}