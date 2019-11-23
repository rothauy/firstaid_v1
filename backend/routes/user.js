
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UserData = require('../models/userData');
const checkAuth = require('../middleware/check-authentication');

const router = express.Router();

router.post("/signup", (req, res, next) => {
    let reqAuthData = req.body.authData;
    let reqUserData = req.body.userData;
    bcrypt.hash(reqAuthData.password, 10)
        .then( hash => {
            const user = new User ({
                email: reqAuthData.email,
                password: hash
            });
            user.save()
                .then( result => {
                    const userData = new UserData ({ 
                        firstName: reqUserData.firstName,
                        lastName: reqUserData.lastName,
                        phoneNumber: reqUserData.phoneNumber,
                        address: reqUserData.address,
                        city: reqUserData.city,
                        state: reqUserData.state,
                        zipCode: reqUserData.zipCode,
                        dateOfBirth: reqUserData.dateOfBirth,
                        gender: reqUserData.gender,
                        email: reqUserData.email
                    })
                    userData.save()
                        .then( result => {
                            res.status(201).json({
                                message: "User was created!",
                                result: result
                            });
                        })
                        .catch (err => {
                            const reqAuthData = req.body.authData;
                            User.deleteOne({email: reqAuthData.email});
                            res.status(500).json({
                                message: "User was not created in UserData signup function routes/user.js",
                                error: err
                            });
                        });
                })
                .catch (err => {
                    res.status(500).json({
                        message: "User was not created in AuthData signup function routes/user.js",
                        error: err
                    });
                });
        });
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    
    User.findOne({ email: req.body.email })
        .then( user => {
            if (!user) {
                return res.status(401).json({
                    message: "Authentication fail in findUser login function routes/user.js"
                })
            }


            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then( result => {
            if (!result) {
                return res.status(401).json({
                    message: "Authentication fail in login de-encryptUser function routes/user.js"
                })
            }

            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h"});
            res.status(200).json({
                message: "Token is created!",
                token: token,
                expiresIn: 3600
            });
        })
        .catch( err => {
            return res.status(401).json({
                message: "Authentication fail in createToken login function routes/user.js",
                error: err
            })
        });
})

router.post("", (req, res, next) => {
    const payload = jwt.verify(req.body, process.env.ACCESS_TOKEN_SECRET);
    UserData.findOne({ email: payload.email })
        .then( userProfile => {
            if (!userProfile) {
                return res.status(401).json({
                    message: "Failed to fetch userProfile!"
                })
            }
            res.status(200).json({
                message: "Fetched UserProfile!",
                userProfile: userProfile
            })
        })
        .catch( err => {
            return res.status(401).json({
                message: "Failed to fetch userProfile!"
            })
        })
})

module.exports = router;