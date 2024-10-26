const jwt = require("jsonwebtoken");

exports.verifycookies = (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    const token = req.cookies.access_token;

    //const token = req.cookies.usertoken;

    console.log(token);

    if (!token) {
      return res.status(403).json({
        message: "their is no cookie available",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SEC_KEY);
      req.user = decoded;
      console.log(req.user);

      next();
    } catch (err) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.verifyisadmin = (req, res, next) => {
  try {
    if (req.user && req.user.isadmin) {
      next();
    } else {
      return res.status(403).json({
        message: "unauthorized user is not an admin",
      });
    }
  } catch (err) {
    next(err);
  }
};
