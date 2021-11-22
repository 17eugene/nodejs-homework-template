const { contactsModel } = require("../../model/index");

const getAllCtrl = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const skip = (page - 1) * limit;

    const { _id } = req.user;
    const contacts = await contactsModel
      .find({ owner: _id }, "_id name email phone owner", {
        skip,
        limit: Number(limit),
      })
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
