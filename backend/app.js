const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const woundsRoutes = require('./routes/wound');
const userRoutes = require('./routes/user');
const resultRoutes = require('./routes/result')

const app = express();

mongoose.connect("mongodb+srv://firstaid:d9M3I1518EB4pvS0@cluster0-1hna2.mongodb.net/test")
        .then(() => {
            console.log("Connected to Test DB in Cluster0 in firstaid-mean project!");
        })
        .catch(() => {
            console.log("Failed to conntect to database!")
        });

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/user", userRoutes);
app.use("/api/wounds", woundsRoutes);
app.use("/api/result", resultRoutes);

module.exports = app;
