const mongoose = require('mongoose');

const woundSchema = mongoose.Schema({
    type: {type: String, required: true},
    description: {type: String, required: true},
    imagePath: {type: String, required: true},
});

module.exports = mongoose.model("Wound", woundSchema);