const { Schema, model } = require("mongoose");

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

const User = model("user", usersSchema);

module.exports = User;
