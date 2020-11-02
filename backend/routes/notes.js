const router = require("express").Router();
let Note = require("../models/note.model");

// GET all notes via url/notes/
router.route("/").get((req, res) => {
  Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json("Error: " + err));
});

// POST a note via url/notes/add
router.route("/add").post((req, res) => {
  // const username = req.body.username;  // TODO: uncomment when users implemented
  const title = req.body.title;
  const content = req.body.content;
  // const date = Date.parse(req.body.date);  // body content is String by default // TODO: uncomment when data is implemented

  const newNote = new Note({
    // username,  // TODO: uncomment when users implemented
    title,
    content,
    // date,  // TODO: uncomment when date implemented
  });

  newNote.save()
    .then(() => res.json("New note saved!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// GET specific note
router.route("/:id").get((req, res) => {  // :id is Mongo's auto-made object id
  Note.findById(req.params.id)    // gets id directly from url via req.params
    .then(note => res.json(note))
    .catch(err => res.status(400).json("Error: " + err));
});

// Delete specific note using id
router.route("/:id").delete((req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json("Note deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

// Update specific note using id
router.route("/update/:id").post((req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      note.username = req.body.username;
      note.title = req.body.title;
      note.content = req.body.content;
      note.date = Date.parse(req.body.date);

      note.save()
        .then(() => res.json("Note updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
})

module.exports = router;