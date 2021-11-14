const { Schema, model } = require("mongoose");

const contactsSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const ContactsModel = model("contact", contactsSchema);

module.exports = ContactsModel;
