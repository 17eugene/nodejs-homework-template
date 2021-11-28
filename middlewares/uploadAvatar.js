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
});

module.exports = {
  uploadAvatar,
};
