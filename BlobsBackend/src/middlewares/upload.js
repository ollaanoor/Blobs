const multer = require("multer");

const allowedTypes = /jpeg|jpg|png/;

const fileFilter = (req, file, cb) => {
  const ext = file.originalname.split(".").pop().toLowerCase();
  const isExtAllowed = allowedTypes.test(ext);
  const isMimeAllowed = allowedTypes.test(file.mimetype);

  if (isExtAllowed && isMimeAllowed) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed."), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

module.exports = upload;
