const { getContactById } = require("../../model/contactsOperations");

const getByIdCtrl = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const contact = await getContactById(id);

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
