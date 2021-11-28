const jwt = require("jsonwebtoken");

const { usersModel } = require("../model/index");

const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      const error = new Error("Signature not exist");
      error.status = 400;
      throw error;
    }

    const [bearer, token] = req.headers.authorization.split(" ");

    if (bearer !== "Bearer") {
      const bearerError = new Error("Unauthorized");
      bearerError.status = 401;
      next(bearerError);
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await usersModel.findById(id);

      if (!user) {
        const userError = new Error("User not found");
        userError.status = 404;
        next(userError);
      }

      if (!user.token) {
        const accessError = new Error("Unauthorized");
        accessError.status = 401;
        next(accessError);
      }

      req.user = user;
      next();
    } catch (error) {
      const tokenError = new Error("Invalid signature!");
      tokenError.status = 401;
      throw tokenError;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
