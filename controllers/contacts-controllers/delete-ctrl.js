// const { deleteContactById } = require("../../model/contactsOperations/index");
const { contactsModel } = require("../../model/index");

const deleteContactCtrl = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const deletedContact = await contactsModel.findByIdAndRemove(id);
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
