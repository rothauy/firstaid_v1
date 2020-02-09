/**
 * Attempts to verify that user has an admin access
 * @param {*} req.userData.role
 */
module.exports = (req, res, next) => {
    try {
        if (req.userData.role === "admin") {
            next();
        } else {
            res.status(401).json({
                title: "Authorization Error",
                message: "You do not have the privilage to make the change. Please contact the support team.",
            })
        } 
    }
    catch (error) {
        res.status(401).json({
            title: "Authorization Error",
            message: "You do not have the privilage to make the change. Please contact the support team.",
            error: error
        })
    }
}