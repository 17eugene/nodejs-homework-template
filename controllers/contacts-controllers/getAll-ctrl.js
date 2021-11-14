// const { getListOfContacts } = require("../../model/contactsOperations/index");
const { contactsModel } = require("../../model/index");

const getAllCtrl = async (req, res, next) => {
  try {
    const contacts = await contactsModel.find({});
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
