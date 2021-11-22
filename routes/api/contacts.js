const express = require("express");
const router = express.Router();

const contactsCtrls = require("../../controllers/contacts-controllers/index");

const { validation, authenticate } = require("../../middlewares/index");
const { joiSchema, joiSchemaUpd } = require("../../validation-schemas/index");

router.get("/", authenticate, contactsCtrls.getAllCtrl);

router.get("/:contactId", authenticate, contactsCtrls.getByIdCtrl);

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  contactsCtrls.addContactCtrl
);

router.delete("/:contactId", authenticate, contactsCtrls.deleteContactCtrl);

router.put(
  "/:contactId",
  authenticate,
  validation(joiSchema),
  contactsCtrls.updateContactCtrl
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(joiSchemaUpd),
  contactsCtrls.updateStatusCtrl
);

module.exports = router;
