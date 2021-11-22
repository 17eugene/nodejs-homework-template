const { usersModel } = require("../../model/index");

const signoutCtrl = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await usersModel.findByIdAndUpdate(_id, { token: null });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = signoutCtrl;
