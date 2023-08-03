const express = require("express");

const router = express.Router();

const users = [];

router.get("/register", (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    res.redirect("/");
  }
  res.render("register");
});

router.post("/register", (req, res, next) => {
  const isUserExists = users.some((user) => user.email === req.body.email);
  if (!isUserExists) {
    users.push({
        email: req.body.email,
        password: req.body.password,
      });
      res.redirect("/login");
  } else {
    res.render("register", { errorMessage: "user already exists" });
  }
});

exports.routes = router;
exports.users = users;
