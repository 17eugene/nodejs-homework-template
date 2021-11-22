const jwt = require("jsonwebtoken");

const { usersModel } = require("../../model/index");

const SECRET_KEY = process.env.SECRET_KEY;

const signinCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      const error = new Error("Incorrect email or password!");
      error.status = 404;
      throw error;
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);
    await usersModel.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Login success",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signinCtrl;
