const multer = require("multer");

const fs = require("fs/promises");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },

  filemane: (req, file, cb) => {
    cb(null, file.originalname);
  },

  limits: {
    fileSize: 3072,
  },
});

const uploadAvatar = multer({
  storage: uploadConfig,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      cb(null, false);
    } else {
      console.log(file.mimetype);
      cb(null, true);
    }
  },
});

module.exports = {
  uploadAvatar,
};
