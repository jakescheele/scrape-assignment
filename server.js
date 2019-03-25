// Dependencies
var express = require('express');
var mongoose = require("mongoose");

// Set up express
var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// Static public folder
app.use(express.static('public'));

// Set up mongo db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true});

// Set up port
var PORT = process.env.PORT || 3000;

// Routes
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

// Listener
app.listen(PORT, function() { 
    console.log("App running on port " + PORT)
});