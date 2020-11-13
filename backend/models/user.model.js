const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,       // removes trailing whitespace if any
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  username: {
    type: String,
  },
}, {
  timestamps: true,   // auto-creates fields for when created/modified
});

module.exports = mongoose.model("User", userSchema);