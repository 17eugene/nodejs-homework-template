const { getListOfContacts } = require("../../model/contactsOperations/index");

const getAllCtrl = async (req, res, next) => {
  try {
    const contacts = await getListOfContacts();
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
