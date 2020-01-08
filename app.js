const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      //Comment = require("./models/comment"),
      seedDB = require("./seeds");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
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
            res.render("index", {campgrounds: campgrounds});
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
    
    res.render("new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {

    //populate comments array in the Campground
    Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
        if(err){
            console.log(err);
        } else {

            res.render("show", {campground: foundCampground});
        }
    })
    
});



app.listen(3000, () => {
    console.log("YelpCamp server on 3000");
});