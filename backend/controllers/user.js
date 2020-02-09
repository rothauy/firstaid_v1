const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UserData = require('../models/userData');

/**
 * Attempts to create new user
 * @param {*} req.body.authData The request object, which contains authentication information
 * @param {*} req.body.userData The request object, which contains user's information
 */
exports.createUser = (req, res, next) => {
    let reqAuthData = req.body.authData;
    let reqUserData = req.body.userData;
    if (reqUserData.registerCode != "v#&t8k") {
        res.status(500).json({
            title: "Signup failed",
            message: "Provided register code is incorrect.",
        });
    }
    //encrypted user's password for enhancing the security of user's identify
    bcrypt.hash(reqAuthData.password, 10)
        .then( hash => {
            const user = new User ({
                email: reqAuthData.email,
                password: hash,
                role: reqAuthData.role
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
                        email: reqUserData.email,
                        registerCode: reqUserData.registerCode
                    })
                    userData.save()
                        .then( result => {
                            res.status(201).json({
                                message: "User was created!",
                                result: result
                            });
                        })
                        .catch (err => {
                            User.deleteOne({email: reqAuthData.email})
                                .then( result => {
                                    res.status(500).json({
                                        title: "Signup failed",
                                        message: "Provided information is incorrect.",
                                        err: err
                                    });
                                })
                        });
                })
                .catch (err => {
                    res.status(500).json({
                        title: "Signup failed",
                        message: "Email is already registered.",
                        error: err
                    });
                });
        });
}

/**
 * Attempts to edit existing user's information
 * @param {*} req.body.authData The request object, which contains authentication information
 * @param {*} req.body.userData The request object, which contains user's information
 */
exports.editUser = (req, res, next) => {
    let reqAuthData = req.body.authData;
    let reqUserData = req.body.userData;
    if (reqAuthData.password == null) {
        const userData = new UserData({
            ...reqUserData,
            _id: reqUserData.id,
        });
        UserData.updateOne({_id: reqUserData.id}, userData)
            .then(result => {
                res.status(200).json({
                    message: "Successfully update an userData profile in backend/route/user.js",
                    result: result
                })
            })
            .catch( err => {
                return res.status(500).json({
                    title: "Failed to update your user's profile",
                    message: "Please contact the support team."
                })
            });
    } else {
        bcrypt.hash(reqAuthData.password, 10)
            .then( hash => {
                const user = new User ({
                    _id: reqAuthData.id,
                    email: reqAuthData.email,
                    password: hash,
                    role: reqAuthData.role
                });
                User.updateOne({_id: reqAuthData.id}, user)
                    .then(result => {
                        const userData = new UserData ({
                            ...reqUserData,
                            _id: reqUserData.id
                        });
                        UserData.updateOne({_id: reqUserData.id}, userData)
                            .then(result => {
                                res.status(201).json({
                                    message: "userProfile was updated.",
                                    result: result
                                });
                            })
                            .catch( err => {
                                return res.status(500).json({
                                    title: "Failed to update your user's profile",
                                    message: "Please contact the support team."
                                });
                            });
                    })
            })
            .catch( err => {
                return res.status(500).json({
                    title: "Failed to update your user's password",
                    message: "Please contact the support team."
                });
            });
    };
}

/**
 * Attempts to fetch and comparing to give access to user
 * @param {*} req.body.email
 * @param {*} req.body.password
 * @returns {*} JWT for user access session
 */
exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then( user => {
            if (!user) {
                return res.status(401).json({
                    Title: "Login failed",
                    message: "User is not found."
                })
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then( result => {
            if (!result) {
                return res.status(401).json({
                    title: "Login failed",
                    message: "Incorrect email or password."
                })
            }
            //Providing token session for user
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id, role: fetchedUser.role },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h"});
            res.status(200).json({
                message: "Token is created!",
                token: token,
                expiresIn: 3600,
                role: fetchedUser.role
            });
        })
        .catch( err => {
            return res.status(401).json({
                title: "Login failed",
                message: "Incorrect email or password."
            })
        });
}

/**
 * Attempts to find user's profile
 * @param {*} req.body The request object, which is a JWT token contains user's credential
 * @returns {*} userProfile information
 */
exports.userProfile = (req, res, next) => {
    const payload = jwt.verify(req.body, process.env.ACCESS_TOKEN_SECRET);
    UserData.findOne({ email: payload.email })
        .then( userProfile => {
            if (!userProfile) {
                return res.status(401).json({
                    title: "Failed to fetch profile",
                    message: "Please contact the support team."
                })
            }
            User.findOne({ email: payload.email })
                .then( userAuth => {
                    if (!userAuth){
                        return res.status(401).json({
                            title: "Failed to authenticate user",
                            message: "Please contact the support team."
                        })
                    }
                    res.status(200).json({
                        message: "Fetched UserProfile!",
                        userProfile: userProfile,
                        userAuth: userAuth
                    })
                })
        })
        .catch( err => {
            return res.status(401).json({
                title: "Failed to get profile",
                message: "Please contact the support team."
            })
        });
}