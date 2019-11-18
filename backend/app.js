const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const woundsRoutes = require('./routes/wound');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect("mongodb+srv://firstaid:d9M3I1518EB4pvS0@cluster0-1hna2.mongodb.net/test")
        .then(() => {
            console.log("Connected to Test DB in Cluster0 in firstaid-mean project!");
        })
        .catch(() => {
            console.log("Failed to conntect to database!")
        });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/user", userRoutes);
app.use("/api/wounds", woundsRoutes);

module.exports = app;
