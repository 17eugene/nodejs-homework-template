const express = require("express");
const router = express.Router();

const {
  validation,
  authenticate,
  uploadAvatar,
} = require("../../middlewares/index");
const { authSchema } = require("../../validation-schemas/index");

const ctrls = require("../../controllers/auth-controllers/index");

router.post("/signup", validation(authSchema), ctrls.signupCtrl);

router.post("/signin", validation(authSchema), ctrls.signinCtrl);

router.get("/signout", authenticate, ctrls.signoutCtrl);

router.get("/current", authenticate, ctrls.getCurrentCtrl);

router.post("/verify", ctrls.resendingCtrl);

router.get("/verify/:verificationToken", ctrls.verificationCtrl);

router.patch(
  "/avatars",
  authenticate,
  uploadAvatar.single("avatarURL"),
  ctrls.updateAvatarCtrl
);

module.exports = router;
