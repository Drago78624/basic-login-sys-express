const users = [];

module.exports = class User {
  constructor(userEmail, userPassword) {
    this.email = userEmail;
    this.password = userPassword;
  }

  save(user) {
    users.push(user);
  }

  static checkingUserExists(userEmail) {
    const isUserExists = users.some((user) => user.email === userEmail);
    return isUserExists;
  }

  static findingUser(userEmail) {
    const user = users.find((user) => user.email === userEmail);
    return user;
  }

  static settingSession(req, userEmail) {
    req.session.userEmail = userEmail;
    req.session.isLoggedIn = true;
  }
};
