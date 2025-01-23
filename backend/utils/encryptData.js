const bcrypt = require("bcryptjs");

const encryptData = async (data) => {
  // Generate a salt
  let salt =await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(data, salt);
  return hashedPassword;
};

module.exports = encryptData;
