const { updateContactById } = require("../../model/contactsOperations/index");

const updateContactCtrl = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const updatedContact = await updateContactById(id, req.body);

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
