const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024 // Limit file size to 1 MB
    },
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/avif', 'image/gif', 'image/png'];
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false, new Error('Invalid file type: Only JPEG, JPG, AVIF, GIF, and PNG files are allowed.'));
        }
    }
}).single('image');

module.exports = upload;