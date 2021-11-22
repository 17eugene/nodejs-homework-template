const { usersModel } = require("../../model/index");

const signoutCtrl = (req, res, next) => {
  try {
    const { _id } = req.user;
    usersModel.findByIdAndUpdate(_id, { token: null });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = signoutCtrl;
