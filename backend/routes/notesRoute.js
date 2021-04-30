const router = require("express").Router();
const auth = require("../middleware/auth");
const Note = require("../models/note.model");

// GET all notes
router.get("/", auth, async (req, res) => {
  try {
    // Get all current user's notes, most recent first
    const userNotes = await Note.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(userNotes);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Could not get user notes." });
  }
});

// Add a note
router.post("/add", auth, async (req, res) => {
  try {
    const userId = req.body.userId;
    const listId = req.body.listId;
    const title = req.body.title;
    const content = req.body.content;
    const deadline = new Date(req.body.deadline); // parse javascript msec date to full date
    const created = new Date(req.body.created);
    const priority = Number.parseInt(req.body.priority);
    const completed = req.body.completed;

    const newNote = new Note({
      userId,
      listId,
      title,
      content,
      deadline,
      created,
      priority,
      completed,
    });

    const savedNote = await newNote.save();
    res.json(savedNote); // TODO: userId is also returned, filter that out?
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Error when creating new note." });
  }
});

// GET specific note
router.get("/:id", auth, async (req, res) => {
  // :id is Mongo's auto-made object id
  try {
    const getNote = await Note.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!getNote)
      return res
        .status(400)
        .json({ msg: "Could not match note/user id to an existing note." });
    res.json(getNote);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Could not get that note." });
  }
});

// Delete specific note using id
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleteNote = await Note.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!deleteNote)
      return res.status(400).json({
        msg: "Could not match note/user ids to any existing note.",
      });
    await Note.findByIdAndDelete(req.params.id);
    res.json("Note deleted.");
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Could not delete note." });
  }
});

// Update specific note using id
router.post("/update/:id", auth, async (req, res) => {
  try {
    const updatedNote = await Note.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    updatedNote.username = req.body.username;
    updatedNote.title = req.body.title;
    updatedNote.content = req.body.content;
    updatedNote.date = Date.parse(req.body.date);

    await updatedNote.save();
    res.json("Note updated!");
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Could not update note." });
  }
});

module.exports = router;
