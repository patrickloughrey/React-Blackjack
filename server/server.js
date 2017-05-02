/*
*
*
* Set Up Express App, Models, Middleware, Route Configs, & Server 
*
*
*/

/* Import dependencies */
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require("./config/config");
var session = require("express-session");
var path = require("path");


/* Create express app */
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static("public"));


/* Set up the PORT and require the models */
var PORT = process.env.PORT || 3000;
var db = require("./models/Game");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;



/* Use sessions to keep track of user's login status */
app.use(session({
    /* Secret field is used for encryption for the hash */
    secret: "double down", 
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

/* Require models */
var Game = require("./models/Game.js");

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/react-blackjack");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

/* Routes config */
  app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname + "/../public/index.html"));
  });

app.get("/game", function(req, res) {
  // Find all users in the user collection with our User model
  Game.find({}, function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Or send the doc to the browser
    else {
      res.send(doc);
    }
  });
});


/* Start express server */
// Listen on Port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});

