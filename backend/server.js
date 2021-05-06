// Requires
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // need proxy front-backend requests for Heroku
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // allows us to use a .env file
require("./database");

// Create express server
const app = express();

// Middleware
app.use(cors()); // applies cors middleware
app.use(express.json()); // allows us to parse JSON

// Database Routes
const userRoute = require("./routes/userRoute");
const notesRoute = require("./routes/notesRoute");
const listsRoute = require("./routes/listRoute");

app.use("/api/user", userRoute); // visiting url/users will show usersRouter
app.use("/api/notes", notesRoute); // visiting url/notes will show notesRouter
app.use("/api/lists", listsRoute);

// Depending on development/production build, send static files from approp place
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // Serve static files from the React frontend
  app.use(express.static(path.join(__dirname, "../frontend/public")));
  // Anything that doesn't match the above, send back index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../frontend/public/index.html"));
  });
} else {
  // Same as above, with build pathname instead due to production build
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../frontend/build/index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 5000; // assign server to port
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
