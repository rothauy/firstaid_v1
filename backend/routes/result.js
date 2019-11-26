const express = require('express');
const multer = require('multer');

const UserHistory = require('../models/userHistory')

const checkAuth = require('../middleware/check-authentication');

const router = express.Router();

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error ("File has an invalid mime type.");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images/users");
        
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

router.post(
    "",
    checkAuth,
    multer({ storage }).single("image"),
    (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    req.body.type = "cut1";
    const userHistory = new UserHistory({
        type: req.body.type,
        imagePath: url + "/images/users/" + req.file.filename,
        creator: req.userData.userId
    })    
    userHistory.save().then(createdHistory => {
        console.log(createdHistory);
        res.status(201).json({
            message: "A new history is added successfully",
            type: "1",
            userHistory: {
                id: createdHistory._id,
                type: createdHistory.type,
                imagePath: createdHistory.imagePath
            }
        });
    });
});

router.get("/histories", checkAuth, (req, res, next) => {
    UserHistory.find().then( userHistories => {
        console.log(userHistories);
        res.status(200).json({
            message: "UserHistories are fetched successfully",
            histories: userHistories
        });
    });
});

router.delete(
    "/histories/:id", 
    checkAuth,
    (req, res, next) => {
    UserHistory.deleteOne({_id: req.params.id})
        .then( result => {
            console.log(result);
            res.status(200).json({ 
                message: "A history was delete!"
            });
        });
});

module.exports = router;
