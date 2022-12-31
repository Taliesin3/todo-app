// Requires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // need proxy front-backend requests for Heroku
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // allows us to use a .env file
require('./database');

// Create express server
const app = express();

// Middleware
app.use(cors()); // applies cors middleware
app.use(express.json()); // allows us to parse JSON

// Database Routes
const userRoute = require('./routes/userRoute');
const notesRoute = require('./routes/notesRoute');
const listsRoute = require('./routes/listRoute');

app.use('/api/user', userRoute);
app.use('/api/notes', notesRoute);
app.use('/api/lists', listsRoute);

let port;
// Depending on development/production build, send static files from approp place
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    port = 3001;
    console.log('⚠️ Not seeing your changes as you develop?');
    console.log(
        "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
    );
    // Serve static files from the React frontend
    app.use(express.static(path.join(__dirname, '../public')));
    // Anything that doesn't match the above, send back index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });
} else {
    port = process.env.PORT || 3000;
    // Same as above, with build pathname instead due to production build
    app.use(express.static(path.join(__dirname, '../build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../build/index.html'));
    });
}

// Start server
const listener = app.listen(port, () => {
    console.log(
        '❇️ Express server is running on port',
        listener.address().port
    );
});
