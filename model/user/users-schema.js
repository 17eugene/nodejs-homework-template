const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { func } = require("joi");

const usersSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is requiered"],
    },

    email: {
      type: String,
      required: [true, "Email is requiered"],
      unique: true,
    },

    subscription: {
      type: String,
      enum: ["starter", "pro", "businness"],
      default: "starter",
    },

    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

usersSchema.methods.setPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(password, salt);
};

usersSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model("user", usersSchema);

module.exports = User;
