const jwt = require("jsonwebtoken");

const jwtwebtoken = (_id, name, lastname, email, isadmin) => {
  const token = jwt.sign(
    {
      _id,
      name,
      lastname,
      email,
      isadmin,
    },
    process.env.JWT_SEC_KEY,
    {
      expiresIn: "7h",
    }
  );
  return token;
};

module.exports = jwtwebtoken;
