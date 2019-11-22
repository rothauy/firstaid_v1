const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    type: {type: String, required: true},
    imagePath: {type: String, required: true},
    creator: {type: String, required: true},
});

module.exports = mongoose.model("result", resultSchema);