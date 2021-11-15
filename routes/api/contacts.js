const express = require("express");
const router = express.Router();

const contactsCtrls = require("../../controllers/contacts-controllers/index");

const { validation } = require("../../middlewares/index");
const { joiSchema, joiSchemaUpd } = require("../../validation-schemas/index");

router.get("/", contactsCtrls.getAllCtrl);

router.get("/:contactId", contactsCtrls.getByIdCtrl);

router.post("/", validation(joiSchema), contactsCtrls.addContactCtrl);

router.delete("/:contactId", contactsCtrls.deleteContactCtrl);

router.put(
  "/:contactId",
  validation(joiSchema),
  contactsCtrls.updateContactCtrl
);

router.patch(
  "/:contactId/favorite",
  validation(joiSchemaUpd),
  contactsCtrls.updateStatusCtrl
);

module.exports = router;
