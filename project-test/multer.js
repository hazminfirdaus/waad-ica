const multer = require('multer');

// Configure multer to specify the destination and filename for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Create a multer instance with the specified storage settings
const upload = multer({ storage: storage });

// Export the upload function to use it in your route handler
module.exports = upload;
