exports.getreviews = async (req, res, next) => {
  try {
    res.send("reviews function");
  } catch (error) {
    next(error);
  }
};
