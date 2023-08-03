const express = require('express');

const router = express.Router()

router.get("/", (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn
    if(isLoggedIn){
        res.render("home", {userEmail: req.session.userEmail})
    }else {
        res.redirect("login")
    }
})

module.exports = router

