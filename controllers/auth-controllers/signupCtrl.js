const { usersModel } = require("../../model/index");

const signupCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email });

    if (user) {
      const error = new Error("User with email already exist");
      error.status = 409;
      throw error;
    }

    const newUser = new usersModel({ email });
    newUser.setPassword(password);
    newUser.save();

    //===================2ой вариант сохранения
    // const salt = bcrypt.genSaltSync(10);
    // const hasedPw = bcrypt.hashSync(password, salt);

    // const newUser = await usersModel.create({ email, password: hasedPw });
    //=========================

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Register success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signupCtrl;
