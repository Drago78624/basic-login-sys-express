const User = require("../models/user");

exports.getHome = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    res.render("home", { userEmail: req.session.userEmail });
  } else {
    res.redirect("login");
  }
};

exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    res.redirect("/");
  }
  res.render("login");
};

exports.postLogin = (req, res, next) => {
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;
  const user = User.findingUser(inputEmail);

  if (user) {
    if (user.password === inputPassword) {
      User.settingSession(req, inputEmail);
      res.redirect("/");
    } else {
      res.render("login", { errorMessage: "bad email or password" });
    }
  } else {
    res.render("login", { errorMessage: "user doesn't exist" });
  }
};

exports.getRegister = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    res.redirect("/");
  }
  res.render("register");
};

exports.postRegister = (req, res, next) => {
  const isUserExists = User.checkingUserExists(req.body.email);
  if (!isUserExists) {
    const user = new User(req.body.email, req.body.password);
    user.save(user);
    res.redirect("/login");
  } else {
    res.render("register", { errorMessage: "user already exists" });
  }
};

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      res.redirect("/login");
    }
  });
};
