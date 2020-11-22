// Requires
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // need proxy front-backend requests for Heroku
require("dotenv").config();   // allows us to use a .env file
require("./database");

// Create express server
const app = express();        

// Middleware
app.use(cors());        // applies cors middleware
app.use(express.json());  // allows us to parse JSON
app.use(bodyParser.json()); // TODO: prob dont need this, using express.json already

// Database Routes
const userRoute = require("./routes/userRoute");
const notesRoute = require("./routes/notesRoute");

app.use("/user", userRoute);  // visiting url/users will show usersRouter
app.use("/notes", notesRoute);  // visiting url/notes will show notesRouter

// proxy front-backend requests for Heroku
// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build'));
});

// Start server
const PORT = process.env.PORT || 5000;  // assign server to port
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));