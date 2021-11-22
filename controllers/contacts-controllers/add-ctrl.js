const { contactsModel } = require("../../model/index");

const addContactCtrl = async (req, res, next) => {
  try {
    const contact = { ...req.body, owner: req.user._id };
    const newContact = await contactsModel.create(contact);
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
