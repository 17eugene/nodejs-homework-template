const getCurrentCtrl = (req, res, next) => {
  const { _id, email, subscription } = req.user;

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      _id,
      email,
      subscription,
    },
  });
};
module.exports = getCurrentCtrl;
