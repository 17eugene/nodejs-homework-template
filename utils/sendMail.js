const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const SG_KEY = process.env.SG_KEY;
sgMail.setApiKey(SG_KEY);

const sendMail = async (data) => {
  const email = { ...data, from: "eviv_send@ukr.net" };
  await sgMail.send(email);
  return true;
};

module.exports = sendMail;
