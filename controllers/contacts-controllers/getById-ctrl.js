// const { getContactById } = require("../../model/contactsOperations");
const { contactsModel } = require("../../model/index");

const getByIdCtrl = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const contact = await contactsModel.findById(id);

    if (!contact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getByIdCtrl;
