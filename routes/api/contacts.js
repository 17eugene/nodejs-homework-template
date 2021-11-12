const express = require("express");
const router = express.Router();

const contactsCtrls = require("../../controllers/contacts-controllers/index");

const { validation } = require("../../middlewares/index");
const { contactsSchema } = require("../../validation-schemas/index");

router.get("/", contactsCtrls.getAllCtrl);

router.get("/:contactId", contactsCtrls.getByIdCtrl);

router.post("/", validation(contactsSchema), contactsCtrls.addContactCtrl);

router.delete("/:contactId", contactsCtrls.deleteContactCtrl);

router.put(
  "/:contactId",
  validation(contactsSchema),
  contactsCtrls.updateContactCtrl
);

module.exports = router;
