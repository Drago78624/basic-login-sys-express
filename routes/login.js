const express = require("express");
const { users } = require("./register");

const router = express.Router();

router.get("/login", (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    res.redirect("/");
  }
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;
  const user = users.find((user) => user.email === inputEmail);

  if (user) {
    if (user.password === inputPassword) {
      req.session.userEmail = user.email;
      req.session.isLoggedIn = true;
      res.redirect("/");
    } else {
      res.render("login", { errorMessage: "bad email or password" });
    }
  } else {
    res.render("login", { errorMessage: "user doesn't exist" });
  }
});

module.exports = router;
