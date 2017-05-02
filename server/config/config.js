/*
*
*
*
* MongoDB Configuration File 
*
*
*
*/
/* Including Passport */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

/* Require index.js */
var db = require("../models/Game");
/* Local Strategy is having the user login with email and password */
passport.use(new LocalStrategy( 
  
  /* User will use his/her email as username */
  { 
    usernameField: "email"
  },

  function(email, password, done) {
      /* When user signs in */
      db.User.findOne({
          where: {
            email: email
          }
      }).then(function(dbUser) {
            /* If there is no user with the email provided */
            if(!dbUser) {
                return done(null, false, {
                    message: "Incorrect email!"
                });

            /* If the user types in the wrong password, but email provided is valid */
            } else if(!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password!"
                });
            }

            return done(null, dbUser);

        });
    }

));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/* Export configured passport model */
module.exports = passport;


/* Create MongoDB connection */