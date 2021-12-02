const gravatar = require("gravatar");

const fs = require("fs/promises");
const path = require("path");

const { usersModel } = require("../../model/index");

const signupCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email });
    const avatar = gravatar.url(email, { protocol: "http" });
    const avatarsFolder = path.join(__dirname, "../../", "public/avatars");

    if (user) {
      const error = new Error("User already exist");
      error.status = 409;
      throw error;
    }

    const newUser = new usersModel({ email, avatarURL: avatar });
    newUser.setPassword(password);
    newUser.save();

    //===================2ой вариант сохранения
    // const salt = bcrypt.genSaltSync(10);
    // const hasedPw = bcrypt.hashSync(password, salt);

    // const newUser = await usersModel.create({ email, password: hasedPw });
    //=========================

    const singleAvatarFolder = path.join(avatarsFolder, String(newUser._id));
    fs.mkdir(singleAvatarFolder);

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Register success",
      data: {
        email,
        subscription: usersModel().subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signupCtrl;
