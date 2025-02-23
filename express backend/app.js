const express = require('express');
const routes = require('./routes');
const cors = require('cors')

// Need to require the entire Passport config module so app.js knows about it
require('./lib/passport');

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- ERROR HANDLE ----------------
 */

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ 
    success: false,
    errors: [err.message],
  });
});


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
console.log('App listening on port 3000');
app.listen(3000);