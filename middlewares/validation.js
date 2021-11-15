const validation = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const favorite = req.body.favorite;
    const postError = new Error(error.message);
    console.log(error.message);
    postError.status = 400;
    next(postError);
  }
  next();
};

module.exports = {
  validation,
};
