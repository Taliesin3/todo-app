const router = require("express").Router();
const auth = require("../middleware/auth");
const List = require("../models/list.model");

// GET all lists
router.get("/", auth, async (req, res) => {
  try {
    // Get all current user's lists, most recent first
    const userLists = await List.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(userLists);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Could not get user's lists." });
  }
});

// Add a list
router.post("/add", auth, async (req, res) => {
  try {
    const userId = req.body.userId;
    const listId = req.body.listId;
    const title = req.body.title;

    const newList = new List({
      userId,
      listId,
      title,
    });

    const savedList = await newList.save();
    res.json(savedList); // TODO: userId is also returned, filter that out?
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Error when creating new list." });
  }
});

// Delete specific list using id
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleteList = await List.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!deleteList)
      return res.status(400).json({
        msg: "Could not match list/user ids to any existing list.",
      });
    await List.findByIdAndDelete(req.params.id);
    res.json("List deleted.");
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Could not delete list." });
  }
});

// Update specific list using id
router.post("/update/:id", auth, async (req, res) => {
  try {
    const updatedList = await List.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    updatedList.title = req.body.title;

    await updatedList.save();
    res.json("List updated!");
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Could not update list." });
  }
});

module.exports = router;
