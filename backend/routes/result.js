const express = require('express');
const multer = require('multer');

const Result = require('../models/result');
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
        cb(error, "backend/images");
        
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
    res.status(200).json({
        message: "Dummy Success",
        type: 1
    });
});

module.exports = router;
