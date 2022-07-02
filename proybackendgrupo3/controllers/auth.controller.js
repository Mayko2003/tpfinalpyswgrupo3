const jwt = require('jsonwebtoken')
const authController = {}

authController.verifyToken = async (req, res, next) => {
    //check si el header authorization existe
    if(!req.headers.authorization){
        res.status(401).json({
            message: 'Unauthorized request'
        })
    }
    else{
        console.log("paso")
        const header = req.headers.authorization.split(' ')
        var token = null
        (header.length === 2) ? token = header[1] : null
        //check si el token existe
        if(!token){
            res.status(401).json({
                message: 'Unauthorized request'
            })
        }
        else{
            try{
                const payload = jwt.verify(token, "jwtsecret")
                req.userid = payload._id
                next()
            }
            catch(err){
                res.status(401).json({
                    message: 'Unauthorized request'
                })
            }
        }
    }
}

module.exports = authController
