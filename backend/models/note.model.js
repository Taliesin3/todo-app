const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  userId: { type: String, required: true },
  listId: { type: String, required: true },
  title: { type: String },
  content: { type: String },
  deadline: { type: Date },
  created: { type: Date, required: true },
  priority: { type: Number },
  completed: { type: Boolean, required: true },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
