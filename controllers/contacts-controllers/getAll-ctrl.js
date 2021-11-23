const { contactsModel } = require("../../model/index");

const getAllCtrl = async (req, res, next) => {
  try {
    const { page = 1, limit = 0, favorite = false } = req.query;
    let skip = (page - 1) * limit;

    const { _id } = req.user;

    if (favorite === "true") {
      const favoriteContacts = await contactsModel
        .find({ owner: _id, favorite: true }, "_id name email phone owner", {
          skip,
          limit: Number(limit),
        })
        .populate("owner", "_id email");
      res.json({
        status: "success",
        code: 200,
        message: "Got favorite",
        data: {
          favoriteContacts,
        },
      });
      return;
    }

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
