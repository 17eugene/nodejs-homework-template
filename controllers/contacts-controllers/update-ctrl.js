const { contactsModel } = require("../../model/index");

const updateContactCtrl = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const userId = req.user._id;

    const updatedContact = await contactsModel.findOneAndUpdate(
      {
        _id: id,
        owner: userId,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedContact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactCtrl;
