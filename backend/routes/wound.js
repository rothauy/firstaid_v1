const express = require('express');

const checkAuth = require('../middleware/check-authentication');
const checkRole = require('../middleware/check-role');
const WoundController = require('../controllers/wound');
const extractImageFile = require('../middleware/check-file');

const router = express.Router();

router.post(
    "", 
    checkAuth,
    checkRole,
    extractImageFile,
    WoundController.createWound);

router.put(
    "/:id",
    checkAuth,
    checkRole,
    extractImageFile,
    WoundController.editWound);

router.delete(
    "/:id", 
    checkAuth,
    checkRole,
    WoundController.deleteWound);

router.get("", WoundController.fetchWounds);

router.get("/:id", WoundController.fetchWound);

module.exports = router;