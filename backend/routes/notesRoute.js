const router = require("express").Router();
const { default: Axios } = require("axios");
const auth = require("../middleware/auth");
const Note = require("../models/note.model");

// GET all notes via url/notes/
router.get("/", auth, (req, res) => {
  Note.find({userId: req.userId})
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json("Error: " + err));
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
    
    newNote.save()
      .then(() => res.json("New note saved!"))
      .catch(err => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(400).json({msg: "Error when creating new note."})
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
    res.status(400).json("Error: " + err);
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
   res.status(400).json("Error: " + err);
  }
});

// Update specific note using id
router.post("/update/:id", auth, async (req, res) => {
  try {
    Note.findOne({_id: req.params.id, userId: req.userId})
    .then(note => {
      note.username = req.body.username;
      note.title = req.body.title;
      note.content = req.body.content;
      note.date = Date.parse(req.body.date);
      
      note.save()
      .then(() => res.json("Note updated!"))
      .catch(err => res.status(400).json("Error: " + err));
    })
  } catch(err) {
    res.status(400).json("Error: " + err);
  } 
})

module.exports = router;