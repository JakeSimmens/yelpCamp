const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment"),
      seedDB     = require("./seeds");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/yelp_camp");

seedDB();

app.get("/", (req, res) => {
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => 
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
app.post("/campgrounds", (req, res) => {
    const campgroundName = req.body.campgroundName;
    const imageURL = req.body.imageURL;
    const description = req.body.description;

    var newCampground = {
        name: campgroundName,
        image: imageURL,
        description: description
    };

    //Add new campground to database
    Campground.create(newCampground, 
        (err, campground) => {
            if(err) {
                console.log("ERROR ADDING CAMPGROUND");
                console.log(err);
            } else {
                res.redirect("/campgrounds");
            }
        }
    );
    

});

//NEW - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
    
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {

    //populate comments array in the Campground
    Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
        if(err){
            console.log(err);
        } else {

            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
    
});

//  *************************
//  COMMENTS ROUTES
//  ********************

//NEW COMMENT
app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
    
});

//CREATE COMMENT
app.post("/campgrounds/:id/comments", (req, res) => {

    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create comment
            Comment.create( req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                } else {
                    //save comment id to campgroumd
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
    
    text = req.body.comment.text;
    const author = req
});



app.listen(3000, () => {
    console.log("YelpCamp server on 3000");
});