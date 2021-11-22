const { usersModel } = require("../../model/index");

const getCurrentCtrl = async (req, res, next) => {
  try {
    const { _id, email, subscription } = req.user;

    await usersModel.findById(_id);

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        email,
        subscription,
      },
    });
  } catch (error) {
    error.status = 401;
    error.message = "Unauthorized";
    next(error);
  }
};

module.exports = getCurrentCtrl;
