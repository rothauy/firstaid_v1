const express = require('express');
const multer = require('multer');

const checkAuth = require('../middleware/check-authentication');
const ResultController = require('../controllers/result');
const extractImageFile = require('../middleware/check-file');

const router = express.Router();

router.post(
    "",
    checkAuth,
    extractImageFile,
    ResultController.createUserHistory
    );

router.get("/histories", checkAuth, ResultController.fetchUserHistories);

router.delete("/histories/:id", checkAuth, ResultController.deleteUserHistory);

module.exports = router;
