const express = require('express');
const multer = require('multer');

const checkAuth = require('../middleware/check-authentication');
const Wound = require('../models/wound');

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
    multer({ storage }).single("image"),
    (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    
    const wound = new Wound({
        type: req.body.type,
        description: req.body.description,
        imagePath: url + "/images/" + req.file.filename,
        // creator: req.userData.userId
    })    
    wound.save().then(createdWound => {
        console.log(createdWound);
        res.status(201).json({
            message: "A new wound type is added successfully",
            wound: {
                id: createdWound._id,
                type: createdWound.type,
                description: createdWound.description,
                imagePath: createdWound.imagePath
            }
        });
    });
});

router.put(
    "/:id",
    multer({ storage: storage }).single("image"),
    (req, res, next) => {
        let imagePath = req.body.imagePath;
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            imagePath = url + "/images/" + req.file.filename;
        }
        const wound = new Wound({
            _id: req.body.id,
            type: req.body.type,
            description: req.body.description,
            imagePath: imagePath,
        });
        Wound.updateOne({_id: req.params.id }, wound).then(updatedWound => {
            res.status(200).json({ 
                message: "Successfully update a wound in backend/route/wound.js",
                wound: wound
            });
        });
});

router.get("", (req, res, next) => {
    Wound.find()
        .then( documents => {
            console.log(documents);
            res.status(200).json({
                message: "Data was fetched successfully",
                wounds: documents
            });
        })
        .catch( () => {
            console.log("The Collections were not found")
        });
});

router.get("/:id", (req, res, next) => {
    Wound.findById(req.params.id).then(wound => {
        if (wound) {
            res.status(200).json(wound);
        } else {
            res.status(404).json({ message: "Wound was not found!" });
        }
    });
});

router.delete(
    "/:id", 
    (req, res, next) => {
    Wound.deleteOne({_id: req.params.id})
        .then( result => {
            console.log(result);
            res.status(200).json({ 
                message: "A type of wound was delete!"
            });
        });
});

module.exports = router;

// Wound.deleteOne({_id: req.params.id, creator: req.userData.userId})