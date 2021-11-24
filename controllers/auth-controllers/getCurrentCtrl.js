const { usersModel } = require("../../model/index");

const getCurrentCtrl = async (req, res, next) => {
  try {
    const { _id, email, subscription } = req.user;

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        _id,
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
