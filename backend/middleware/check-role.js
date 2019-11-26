module.exports = (req, res, next) => {
    try {
        if (req.userData.role == "admin") {
            next();
        }
    }
    catch (error) {
        res.status(401).json({
            message: "Authorization Error in check-role.js",
            error: error
        })
    }
}