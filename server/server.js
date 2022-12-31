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

// Start server
let port;
console.log('❇️ NODE_ENV is', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    port = process.env.PORT || 3000;
    app.use(express.static(path.join(__dirname, '../build')));
    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
} else {
    port = 3001;
    console.log('⚠️ Not seeing your changes as you develop?');
    console.log(
        "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
    );
}

const listener = app.listen(port, () => {
    console.log(
        '❇️ Express server is running on port',
        listener.address().port
    );
});
