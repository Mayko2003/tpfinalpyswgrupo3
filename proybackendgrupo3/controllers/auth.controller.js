const jwt = require('jsonwebtoken')
const authController = {}

authController.verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).json({
            message: 'Unauthorized request'
        })
    }
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        res.status(401).json({
            message: 'Unauthorized request'
        })
    }
    const payload = jwt.verify(token, "jwtsecret")
    next()
}

module.exports = authController
