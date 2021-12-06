const { usersModel } = require("../../model/index");

const verificationCtrl = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await usersModel.findOne({ verificationToken });

    if (!user) {
      const error = new Error("Not found");
      error.status = 400;
      throw error;
    }

    await usersModel.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });

    res.json({
      message: "Verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verificationCtrl;
