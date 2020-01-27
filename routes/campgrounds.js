const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");  //automatically requires index.js

//INDEX - show all campgrounds
router.get("/", (req, res) => 
{
    Campground.find({}, (err, campgrounds) => 
    {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
    
});

//CREATE - add new campgrounds
router.post("/", middleware.isLoggedIn, (req, res) => {
    var campgroundName = req.body.campgroundName;
    var imageURL = req.body.imageURL;
    var description = req.body.description;
    var price = req.body.price;

    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var newCampground = {
        name: campgroundName,
        image: imageURL,
        description: description,
        price: price,
        author: author
    };

    //Add new campground to database
    Campground.create(newCampground, 
        (err, campground) => {
            if(err) {
                console.log("ERROR ADDING CAMPGROUND");
                console.log(err);
            } else {
                //console.log("New campground: " + campground);
                res.redirect("/campgrounds");
            }
        }
    );
    

});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
    
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", (req, res) => {

    //populate comments array in the Campground
    Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
        if(err){
            console.log(err);
        } else {

            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
    
});

//EDIT CAMPGROUND
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {

    Campground.findById(req.params.id, (err, foundCampground) =>{
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("campgrounds/edit", {editCampground: foundCampground});
        }
    });
});

//UPDATE CAMPGROUND
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "You updated your campground.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });

        
});

//DESTROY CAMPGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {

    //find camp to delete
    Campground.findById(req.params.id, (err, campground) => {

        //create an array of all existing comment ID to delete later
        var commentIds = [];
        campground.comments.forEach((comment) => {
            commentIds.push(comment);
        });

        //Delete existing comments
        commentIds.forEach((comment) => {
            Comment.findByIdAndRemove(comment, (err, deletedComment) => {
                if(err){
                    console.log("ERROR DELETING COMMENT: " + err);
                } else {
                    
                }
            });
        });

        //delete campground
        campground.remove((err) => {
            if(err){
                console.log("ERROR DELETING CAMPGROUND: " + err);
            }
        });

        //console.log(commentIds);
        res.redirect("/campgrounds");
    });
});

module.exports = router;