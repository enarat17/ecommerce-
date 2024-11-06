const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => bcrypt.hashSync(password, salt);

const comparePasswords = (inputPassword, hashedPassword) => {
    if (!inputPassword || !hashedPassword) {
        console.error("Missing input or hashed password in comparison:", { inputPassword, hashedPassword });
        return false; // Return false instead of throwing an error
    }
    return bcrypt.compareSync(inputPassword, hashedPassword);
};

module.exports = { hashPassword, comparePasswords };
