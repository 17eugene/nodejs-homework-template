const { usersModel } = require("../../model/index");

const fs = require("fs/promises");
const path = require("path");

const Jimp = require("jimp");

const avatarsFolder = path.join(__dirname, "../../", "public/avatars");

const updateAvatarCtrl = async (req, res, next) => {
  const { path: tempDir, originalname } = req.file;
  const { _id, email } = req.user;

  try {
    if (!req.file) {
      const mediaError = new Error("Bad request");
      mediaError.status = 400;
      return next(mediaError);
    }

    const avatarFileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsFolder, String(_id), avatarFileName);
    await fs.rename(tempDir, resultUpload);
    const avatarURL = path.join("/avatars", String(_id), avatarFileName);

    const modificatedAvatar = await Jimp.read(resultUpload);
    modificatedAvatar.resize(250, 250).write(resultUpload);

    const updated = await usersModel.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    );

    if (!updated) {
      const updAvatarError = new Error("Bad request");
      updAvatarError.status = 400;
      next(updAvatarError);
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        _id,
        email,
        avatarURL,
      },
    });
  } catch (error) {
    fs.unlink(tempDir);
    next();
  }
};

module.exports = updateAvatarCtrl;
