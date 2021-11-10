const { addContact } = require("../../model/contactsOperations");

const addContactCtrl = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
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
