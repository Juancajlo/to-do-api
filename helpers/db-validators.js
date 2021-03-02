const models = require("../models");
const User = models.User;

const existUserByEmail = async (email) => {
  if (email !== undefined) {
    await User.findOne({ where: { email } }).then((user) => {
      if (user !== null) {
        throw new Error(`Email ${email} already exist`);
      }
    });
  }
};

module.exports = {
  existUserByEmail,
};