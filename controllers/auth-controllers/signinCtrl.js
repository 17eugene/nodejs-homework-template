const { usersModel } = require("../../model/index");

const signinCtrl = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await usersModel.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = signinCtrl;
