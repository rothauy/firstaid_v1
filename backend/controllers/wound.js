const Wound = require('../models/wound');

/**
 * Attempts to create new wound
 * @param {*} req.body.type
 * @param {*} req.body.description
 * @param {*} req.body.imagePath
 */
exports.createWound = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const wound = new Wound({
        type: req.body.type,
        description: req.body.description,
        imagePath: url + "/images/" + req.file.filename,
    })    
    wound.save()
        .then(createdWound => {
            res.status(201).json({
                message: "A new wound type is added successfully",
                wound: {
                    id: createdWound._id,
                    type: createdWound.type,
                    description: createdWound.description,
                    imagePath: createdWound.imagePath
                }
            });
        })
        .catch( err => {
            return res.status(401).json({
                title: "Failed to save a new wound",
                message: "Please contact the support team."
            })
        });
}

/**
 * Attempts to edit existing wound
 * @param {*} req.body.type
 * @param {*} req.body.description
 * @param {*} req.body.imagePath
 */
exports.editWound = (req, res, next) => {
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
    Wound.updateOne({_id: req.params.id }, wound)
        .then(updatedWound => {
            res.status(200).json({ 
                message: "Successfully update a wound in backend/route/wound.js",
                wound: wound
            });
        })
        .catch( err => {
            return res.status(500).json({
                title: "Failed to update the selected wound",
                message: "Please contact the support team."
            })
        });
}

/**
 * Attempts to delete
 * @param {*} req.params.id The request object, which is the ID of the wound in MongoDB
 */
exports.deleteWound = (req, res, next) => {
    Wound.deleteOne({_id: req.params.id})
        .then( result => {
            res.status(200).json({ 
                message: "A type of wound was delete!"
            });
        })
        .catch( err => {
            return res.status(500).json({
                title: "Failed to delete a wound",
                message: "Please contact the support team."
            })
        });
}

/**
 * Attempts to find a specific wound
 * @param {*} req.params.id The request object, which is the ID of the wound in MongoDB
 */
exports.fetchWound = (req, res, next) => {
    Wound.findById(req.params.id)
        .then(wound => {
            if (wound) {
                res.status(200).json(wound);
            } else {
                res.status(404).json({ message: "Wound was not found!" });
            }
        })
        .catch( err => {
            return res.status(500).json({
                title: "Failed to get a wound",
                message: "Please contact the support team."
            })
        });
}

/**
 * Attempts to find all the wounds
 */
exports.fetchWounds = (req, res, next) => {
    Wound.find()
        .then( documents => {
            res.status(200).json({
                message: "Data was fetched successfully",
                wounds: documents
            });
        })
        .catch( err => {
            return res.status(500).json({
                title: "Failed to fetch wounds",
                message: "Please contact the support team."
            })
        });
}