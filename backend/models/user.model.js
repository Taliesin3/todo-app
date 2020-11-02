const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,       // removes trailing whitespace if any
    minlength: 3
  },
}, {
  timestamps: true,   // auto-creates fields for when created/modified
})

const User = mongoose.model("User", userSchema);

module.exports = User;