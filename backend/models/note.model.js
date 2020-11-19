const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  userId: {type: String, required: true},  // TODO: uncomment when username implemented
  title: {type: String},
  content: {type: String},
  // date: {type: Date, required: true},    // TODO: uncomment when date implemented
}, {
  timestamps: true,
})

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;