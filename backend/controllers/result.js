const UserHistory = require('../models/userHistory');
const Wound = require('../models/wound');
const Jimp = require('jimp');

exports.classifyWound = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    Wound.find()
        .then(result => {
            const saveResult = result[req.body.ind];
            
            const userHistory = new UserHistory({
                type: saveResult.type,
                imagePath: url + "/images/" + req.file.filename,
                creator: req.userData.userId
            });
            userHistory.save()
                .then(createdHistory => {
                    res.status(201).json({
                        message: "A new history is added successfully",
                        wound: saveResult
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