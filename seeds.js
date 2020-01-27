const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

var data =[
    {
        name: "Peaks Park",
        image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Jnatus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? "
    },
    {
        name: "Coffee River",
        image: "https://images.unsplash.com/photo-1529385101576-4e03aae38ffc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur"
    },
    {
        name: "Big Rock",
        image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,"
    },
    {
        name: "Fire Sky Reserve",
        image: "https://images.unsplash.com/photo-1525796489183-fbeb13a8d843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam"
    }
];

//remove everything in database
function seedDB(){

    //Remove all campgrounds
    Campground.deleteMany({}, (err) => {
        // if(err){
        //     console.log(err);
        // } else {
        //     console.log("Campgrounds removed.")
            
        //     //add campgrounds
        //     data.forEach((seed) => {
        //         Campground.create(seed, (err, campground) => {
        //             if(err){
        //                 console.log(err);
        //             } else {
        //                 console.log("Added campground.");
        //                 //add a comment
        //                 Comment.create(
        //                     {
        //                         text: "Come check this out and leave your phone at home for the trip.  It's awesome and relaxing here.",
        //                         author: "A Guy"
        //                     }, (err, comment) =>
        //                     {
        //                         if(err){
        //                             console.log(err);
        //                         } else {
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log("Created new comment");
        //                         }

        //                     }
        //                 );
        //             }
        //         });
        //     });
        // }
    });



    //add comments
};
module.exports = seedDB;