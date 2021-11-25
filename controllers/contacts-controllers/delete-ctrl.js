const { contactsModel } = require("../../model/index");

const deleteContactCtrl = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const userId = req.user._id;

    const deletedContact = await contactsModel.findOneAndRemove({
      _id: id,
      owner: userId,
    });
    if (!deletedContact) {
      const deleteError = new Error("Not found");
      deleteError.status = 404;
      throw deleteError;
    }

    res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
      data: {
        deletedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContactCtrl;
