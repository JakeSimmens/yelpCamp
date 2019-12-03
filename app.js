const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "camp 1", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkingcreekresort.com%2Fwp-content%2Fthemes%2Fdesign2wordpress%2Fimages%2Fimg_camping.jpg&f=1&nofb=1"},
    {name: "camp 2", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkingcreekresort.com%2Fwp-content%2Fthemes%2Fdesign2wordpress%2Fimages%2Fimg_camping.jpg&f=1&nofb=1"},
    {name: "camp 3", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkingcreekresort.com%2Fwp-content%2Fthemes%2Fdesign2wordpress%2Fimages%2Fimg_camping.jpg&f=1&nofb=1"}
];

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    const campgroundName = req.body.campgroundName;
    const imageURL = req.body.imageURL;

    // add new campground to existing array
    campgrounds.push({
        name: campgroundName,
        image: imageURL
    });

    res.redirect("/campgrounds");

});

app.get("/campgrounds/new", (req, res) => {
    
    res.render("new");
});



app.listen(3000, () => {
    console.log("YelpCamp server on 3000");
});