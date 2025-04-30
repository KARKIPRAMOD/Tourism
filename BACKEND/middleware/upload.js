// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Factory function to create multer instance for specific folders
const createUploader = (folderName) => {
  const uploadDir = path.join(__dirname, "..", "uploads", folderName);

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Created directory: ${uploadDir}`);
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });

  return multer({ storage });
};

module.exports = createUploader;
