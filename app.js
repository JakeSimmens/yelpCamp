const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      methodOverride        = require("method-override"),
      flash                 = require("connect-flash"),
      User                  = require("./models/user",)
      Campground            = require("./models/campground"),
      Comment               = require("./models/comment"),
      seedDB                = require("./seeds");

//Requiring Routes
const commentRoutes     = require("./routes/comments"),
      campgroundsRoutes = require("./routes/campgrounds"),
      indexRoutes       = require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost/yelp_camp");
 
//seedDB();  //SEED DATABASE

//Passport configuration
app.use(require("express-session")({
    secret: "Rise of Skywalker is better than Last Jedi",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to pass on current user data from passport.  Can be acces using currentUser on all routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");  //error refers to ejs code
    res.locals.success = req.flash("success");  //success refers to ejs code
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, () => {
    console.log("YelpCamp server on 3000");
});