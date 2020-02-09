const jwt = require('jsonwebtoken');

/**
 * Attempts to verify user's credential
 * @param {*} req.headers.authorization 
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userData = { email: decodedToken.email, userId: decodedToken.userId, role: decodedToken.role };
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "Authorization Error in check-authentication.js",
            error: error
        })
    }
}