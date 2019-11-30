const UserHistory = require('../models/userHistory');
const Wound = require('../models/wound');

const woundList = {
    1: "5de18864ed51af07b5571e28",
    2: "5de18886ed51af07b5571e29",
    3: "5de188aaed51af07b5571e2a",
    4: "5de188caed51af07b5571e2b",
    5: "5de188eced51af07b5571e2c",
    6: "5de1891bed51af07b5571e2d",
    7: "5de18944ed51af07b5571e2e"
};

exports.classifyWound = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    let type = Math.round(Math.random() * 7) + 1;

    Wound.findById(woundList[type])
        .then(result => {
            const saveResult = result;
            const userHistory = new UserHistory({
                type: result.type,
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