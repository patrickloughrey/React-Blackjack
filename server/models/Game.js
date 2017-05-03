/*
*
*
* Mongoose Middleware File/Set Up Schema 
*
*
*/

// Require mongoose
var mongoose = require("mongoose");
/* Import dependencies, require mongoose */
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  // name: a unique String
  username: {
    type: String,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    trim: true,
    unique: true
  }
});

/* Set up database schema */
var Game = mongoose.model("Game", UserSchema);

// Export the user model
module.exports = Game;

