// const { addContact } = require("../../model/contactsOperations");

const { contactsModel } = require("../../model/index");

const addContactCtrl = async (req, res, next) => {
  try {
    const newContact = await contactsModel.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContactCtrl;
