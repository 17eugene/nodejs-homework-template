const { contactsModel } = require("../../model/index");

const getAllCtrl = async (req, res, next) => {
  try {
    let { page = 1, limit = 0, favorite = false } = req.query;

    page = Number(page);
    limit = Number(limit);

    if (Number.isNaN(page) || Number.isNaN(limit)) {
      const requestError = new Error("Bad request");
      requestError.status = 400;
      throw requestError;
    }

    let skip = (page - 1) * limit;

    const { _id } = req.user;

    const contacts = await contactsModel
      .find({ owner: _id, favorite }, "_id name email phone favorite owner", {
        skip,
        limit: limit,
      })
      .populate("owner", "_id email");
    res.json({
      status: "success",
      code: 200,
      message: "success",
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllCtrl;
