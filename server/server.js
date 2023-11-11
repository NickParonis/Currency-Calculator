// Importing required modules
const express = require('express'); // Express framework for handling HTTP requests
const app = express(); // Initializing the Express application
const usersRouter = require('./routes/userRoutes'); // Importing the user routes
const currencyRouter = require('./routes/currencyRoutes'); // Importing the currency routes
const dotenv = require('dotenv'); // Module to load environment variables from a .env file into process.env
const mongoose = require('mongoose'); // Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js
dotenv.config( { path: './config.env'} ); // Loading environment variables from the config file
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

// Connecting to the MongoDB database
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => {
        console.log('Database connection: success')
    });

// Applying middleware
app.use(cors()); // Enabling Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parsing incoming requests with JSON payloads
app.use('/api/user', usersRouter); // Using the user routes for requests starting with /api/user
app.use('/api/currency', currencyRouter); // Using the currency routes for requests starting with /api/currency

// Setting up the server to listen to incoming requests
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server started")
});