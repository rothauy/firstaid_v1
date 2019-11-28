
const express = require('express');

const checkAuth = require('../middleware/check-authentication');
const UserController = require('../controllers/user');

const router = express.Router();

router.post("/signup", UserController.createUser );

router.put("/signup", checkAuth, UserController.editUser );

router.post("/login", UserController.userLogin );

router.post("/getProfile", checkAuth, UserController.userProfile );

module.exports = router;