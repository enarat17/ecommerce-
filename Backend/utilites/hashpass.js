const bycrpt = require("bcryptjs");

const salt = bycrpt.genSaltSync(10);

exports.hashpass = (pass) => {
  return bycrpt.hashSync(pass, salt);
};

exports.passcompare = (password, hashingpass) =>
  bycrpt.compareSync(password, hashingpass);
