const express = require("express");

const router = express.Router();

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
