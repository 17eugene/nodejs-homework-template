const { contactsModel } = require("../../model/index");

const getAllCtrl = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const contacts = await contactsModel
      .find({ owner: _id })
      .populate("owner", "_id email");
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllCtrl;
