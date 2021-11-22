const express = require("express");
const router = express.Router();

const { validation } = require("../../middlewares/index");
const { authenticate } = require("../../middlewares/index");
const { authSchema } = require("../../validation-schemas/index");

const ctrls = require("../../controllers/auth-controllers/index");

router.post("/signup", validation(authSchema), ctrls.signupCtrl);

router.post("/signin", validation(authSchema), ctrls.signinCtrl);

router.get("/signout", authenticate, ctrls.signoutCtrl);

router.get("/current", authenticate, ctrls.getCurrentCtrl);

module.exports = router;
