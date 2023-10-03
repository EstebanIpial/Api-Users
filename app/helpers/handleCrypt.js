const bcrypt = require("bcrypt");

/**
 * function cryptPassword in charge of encrypting passwords
 * @param {String} passwordText
 * @returns hash password encrypt with jump 10
 */
module.exports.cryptPassword = (passwordText) => {
  let salt = bcrypt.genSaltSync(12);
  let passwordEncrypt = bcrypt.hashSync(passwordText, salt);
  return passwordEncrypt;
};

/**
 * function comparePassword to login user
 * @param {String} passwordText
 * @param {String} passwordHash
 * @returns boolean if its the equals password
 */
module.exports.comparePassword = (passwordText, passwordHash) => {
  return bcrypt.compareSync(passwordText, passwordHash);
};
