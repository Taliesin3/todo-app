// Requires
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();   // allows us to use a .env file

// need proxy front-backend requests for Heroku
const path = require("path");   

// Set up server
const app = express();        // creates express server
const PORT = process.env.PORT || 5000;  // assign server to port

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
const userRoute = require("./routes/userRoute");
const notesRoute = require("./routes/notesRoute");

app.use("/user", userRoute);  // visiting url/users will show usersRouter
app.use("/notes", notesRoute);  // visiting url/notes will show notesRouter

// proxy front-backend requests for Heroku
// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, '../src')));
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../src/public/index.html'));
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));