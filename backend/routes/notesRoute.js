const router = require("express").Router();
const auth = require("../middleware/auth");
const Note = require("../models/note.model");

// GET all notes via url/notes/
router.get("/", auth, async (req, res) => {
  try {
    const userNotes = await Note.find({userId: req.userId})
    res.json(userNotes);
  } catch (err) {
    console.log(err);
    res.status(400).json({msg: "Could not get user notes."});
  } 
});

// POST a note via url/notes/add
router.post("/add", auth, async (req, res) => {
  try{
    // const username = req.body.username;  // TODO: uncomment when users implemented
    const userId = req.userId;
    const title = req.body.title;
    const content = req.body.content;
    // const date = Date.parse(req.body.date);  // body content is String by default // TODO: uncomment when data is implemented
    
    const newNote = new Note({
      userId,  // TODO: uncomment when users implemented
      title,
      content,
      // date,  // TODO: uncomment when date implemented
    });
    
    const savedNote = await newNote.save();
    res.json(savedNote);

  } catch (err) {
    console.log(err);
    res.status(400).json({msg: "Error when creating new note."});
  }
});
  
// GET specific note
router.get("/:id", auth, async (req, res) => {  // :id is Mongo's auto-made object id
  try {
    const getNote = await Note.findOne({_id: req.params.id, userId: req.userId});
    if (!getNote)
      return res.status(400).json({msg: "Could not match note/user id to an existing note."})
    res.json(getNote);
  } catch(err) {
    console.log(err);
    res.status(400).json({msg: "Could not get that note."});
  } 
});

// Delete specific note using id
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleteNote = await Note.findOne({_id: req.params.id, userId: req.userId});
    if (!deleteNote)
      return res.status(400).json({
        msg: "Could not match note/user ids to any existing note."
      });
    await Note.findByIdAndDelete(req.params.id);
    res.json("Note deleted.");
  } catch(err) {
    console.log(err);
    res.status(400).json({msg: "Could not delete note."});
  }
});

// Update specific note using id
router.post("/update/:id", auth, async (req, res) => {
  try {
    const updatedNote = await Note.findOne({_id: req.params.id, userId: req.userId})
    updatedNote.username = req.body.username;
    updatedNote.title = req.body.title;
    updatedNote.content = req.body.content;
    updatedNote.date = Date.parse(req.body.date);
      
    await updatedNote.save();
    res.json("Note updated!");
  } catch (err) {
    console.log(err);
    res.status(400).json({msg: "Could not update note."});
  } 
})

module.exports = router;