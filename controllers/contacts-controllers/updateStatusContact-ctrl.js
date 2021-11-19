const { contactsModel } = require("../../model/index");

const updateStatusCtrl = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const updatedContact = await contactsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedContact) {
      const error = new Error("missing field 'favorite'");
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

module.exports = updateStatusCtrl;
