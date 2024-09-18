const multer = require("multer");

const storage = multer.memoryStorage();

const fileUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const mimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."));
    }
  },
});

module.exports = fileUpload;
