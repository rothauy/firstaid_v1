const UserHistory = require('../models/userHistory');
const Wound = require('../models/wound');

/** 
 * Dictionary for types, which was testify with the model
 */
const woundType = {
    "1" : "First Degree Burn",
    "3" : "Second Degree Burn",
    "0" : "Abrasion",
    "5" : "Minor Cut",
    //Discrepancy Value
    "2" : "Third Degree Burn",
    "4" : "Laceration"
}

/**
 * Attempts to find the wound type against MongoDB
 * @param {*} req.body.ind The number that the model classify on the front-end
 * @return {*} result The found wound from the database
 */
exports.classifyWound = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    Wound.findOne({ type: woundType[req.body.ind] })
        .then( result => {    
            const userHistory = new UserHistory({
                type: result.type,
                imagePath: url + "/images/" + req.file.filename,
                creator: req.userData.userId
            });
            userHistory.save()
                .then(createdHistory => {
                    res.status(201).json({
                        message: "A new history is added successfully",
                        wound: result
                    });
                })
                .catch( err => {
                    return res.status(401).json({
                        title: "Creating new history failed",
                        message: "Please contact the support team."
                    });
                })
        })
        .catch(err => {
            return res.status(401).json({
                title: "Wound is not classifid",
                message: "It is not in our scope."
            });
        });       
}

/**
 * Attempts to find all user's histories
 * @param {*} req The request object to find all the user's histories
 * @return {*} The response object of user's histories
 */
exports.fetchUserHistories = (req, res, next) => {
    UserHistory.find().sort({_id:-1})
        .then( userHistories => {
            res.status(200).json({
                message: "UserHistories are fetched successfully",
                histories: userHistories
            });
        })
        .catch( err => {
            return res.status(401).json({
                title: "Failed to get histories",
                message: "Please contact the support team."
            })
        });
}

/**
 * Attempts to remove user's history
 * @param {*} req The request object to remove user's history
 */
exports.deleteUserHistory = (req, res, next) => {
    UserHistory.deleteOne({_id: req.params.id})
        .then( result => {
            res.status(200).json({ 
                message: "A history was delete!"
            });
        })
        .catch( err => {
            return res.status(401).json({
                title: "Failed to delete histories",
                message: "Please contact the support team."
            })
        });
}