const sgMail = require("@sendgrid/mail");

const { usersModel } = require("../../model/index");

const resendingCtrl = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await usersModel.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      next(error);
    }

    if (!user.verificationToken) {
      const verificationError = new Error("Verification failed");
      verificationError.status = 401;
      next(verificationError);
    }

    const resendMail = {
      to: "email",
      subject: "Email confirmation",
      html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Click here to comfirm email</a>`,
    };

    await sgMail.send(resendMail);

    res.json({
      message: "Successfully re-sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendingCtrl;
