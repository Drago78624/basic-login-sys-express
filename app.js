const express = require("express");
const loginRoutes = require("./routes/login");
const registerData = require("./routes/register");
const homeRoutes = require("./routes/home");
const bodyParser = require("body-parser");
const session = require('express-session');
const logoutRoutes = require("./routes/logout")

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(
  session({
    secret: "honolulu",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(registerData.routes);
app.use(loginRoutes);
app.use(homeRoutes);
app.use(logoutRoutes);

app.use((req, res, next) => {
  res.render("404");
});

app.listen(3000);
