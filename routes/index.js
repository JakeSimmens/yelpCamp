const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//Root route
router.get("/", (req, res) => {
    res.render("landing");
});


//Show register form
router.get("/register", (req, res) => {
    res.render("register");
});

//handle user sign up
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});

    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "You're now a member of YelpCamp, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Show login
router.get("/login", (req, res) => {
    res.render("login");
});

//Login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),
    (req, res) => {}
);

//Logout route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "You logged out.  Please don't leave me.");
    res.redirect("/campgrounds");
});


module.exports = router;