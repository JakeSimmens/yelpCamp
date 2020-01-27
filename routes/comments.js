const express = require("express");
//use mergeParams to allow req.params.id to pass thru
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");  //automatically requires index.js


//NEW COMMENT, only access if logged in
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
    
});

//CREATE COMMENT
router.post("/", middleware.isLoggedIn, (req, res) => {

    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create comment
            //comment below is an object with text and author
            Comment.create( req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                    req.flash("error", "Something went wrong creating your coment.");
                } else {
                    //save comment id to campgroumd
                    //add username and id to comment
                  
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    comment.date = getDateTime();
                    comment.save();
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    req.flash("success", "You added your comment successfully.");
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
    
    //text = req.body.comment.text;
    //const author = req
});

//EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            //console.log(comment);
            res.render("comments/edit", {comment: foundComment, campground_id: req.params.id});
        }

    });


});

//UPDATE COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, (req,res) => {

    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, comment) => {
        if(err){
            console.log(err);
            res.redirect("back");
        } else{
            req.flash("success", "You deleted your comment.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    // var sec  = date.getSeconds();
    // sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return month + "/" + day + "/" + year + " @ " + hour + ":" + min;
    //return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

module.exports = router;