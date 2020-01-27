const Campground = require("../models/campground");
const Comment = require("../models/comment");

//Middleware
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) =>{
            if(err) {
                req.flash("error", "We can't find the campground.");
                res.redirect("back");
            } else {
                //check that user requesting edit matches author
                //using mongoose to check equality
                if(foundCampground.author.id.equals(req.user._id)){
                    return next();
                } else {
                    req.flash("error", "I'm sorry.  Only the creater of this campground may do that.");
                    res.redirect("back");
                }
                
            }
        });
    } else {
        //if not authorized to make changes, redirect
        req.flash("error", "Login, you must.");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
    //check user is logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) =>{
            if(err) {
                console.log(err);
                res.redirect("back");
            } else {
                //check that user requesting edit matches author
                //using mongoose to check equality
                if(foundComment.author.id.equals(req.user._id)){
                    return next();
                } else {
                    req.flash("error", "Only the creater of this comment can change it.");
                    res.redirect("back");
                }
                
            }
        });
    } else {
        //if not authorized to make changes, redirect
        req.flash("error", "Login, you must.");
        res.redirect("back");
    }

}

middlewareObj.isLoggedIn = (req, res, next) => {
    //check user is logged in
    if(req.isAuthenticated() ){
        return next();
    }
    req.flash("error", "Login, you must.");
    res.redirect("/login");
}


module.exports = middlewareObj;