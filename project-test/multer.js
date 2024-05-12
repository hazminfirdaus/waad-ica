const multer = require('multer');
const path = require('path');

// Configure multer to specify the destination and filename for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb (null, file.originalname);
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Create a multer instance with the specified storage settings
const upload = multer({ storage: storage });

// Export the upload function to use it in your route handler
module.exports = upload;
