// Requires
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();   // allows us to use a .env file

// Set up server
const app = express();        // creates express server
const port = process.env.PORT || 5000;  // assign server to port

// Middleware
app.use(cors());        // applies cors middleware
app.use(express.json());  // allows us to parse JSON

// Mongoose DB connection
const uri = process.env.ATLAS_URI;  // get from Atlas dashboard
mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Database Routes
const usersRouter = require("./routes/users");
const notesRouter = require("./routes/notes");

app.use("/users", usersRouter);  // visiting url/users will show usersRouter
app.use("/notes", notesRouter);  // visiting url/notes will show notesRouter

// Start server
app.listen(port, () => {  // start server
  console.log(`Server is running on port: ${port}`);
});