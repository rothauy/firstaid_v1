const UserHistory = require('../models/userHistory')

exports.createUserHistory = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    req.body.type = "cut1";
    const userHistory = new UserHistory({
        type: req.body.type,
        imagePath: url + "/images/users/" + req.file.filename,
        creator: req.userData.userId
    })    
    userHistory.save()
        .then(createdHistory => {
            res.status(201).json({
                message: "A new history is added successfully",
                type: "1",
                userHistory: {
                    id: createdHistory._id,
                    type: createdHistory.type,
                    imagePath: createdHistory.imagePath
                }
            });
        })
        .catch( err => {
            return res.status(401).json({
                title: "Creating new history failed",
                message: "Please contact the support team."
            })
        });;
}

exports.fetchUserHistories = (req, res, next) => {
    UserHistory.find()
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