const mongoose = require('mongoose');

const userHistorySchema = mongoose.Schema({
    type: {type: String, required: true},
    imagePath: {type: String, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
});

module.exports = mongoose.model("UserHistory", userHistorySchema);