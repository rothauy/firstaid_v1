const mongoose = require('mongoose');

const userDataSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipCode: {type: Number, required: true},
    dateOfBirth: {type: Date, required: true},
    gender: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    registerCode: {type: String, required: true},
});

module.exports = mongoose.model("UserData", userDataSchema);
